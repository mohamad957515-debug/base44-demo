import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven cinematic hero.
 *
 * The hero is a tall "scroll track" (~250–400vh depending on the video
 * duration) with a 100vh sticky viewport pinned at the top. The user's scroll
 * progress through the track maps 1:1 to the video timeline — scrolling scrubs
 * `video.currentTime`; the video is NEVER played (`no play()`, no autoplay, no
 * loop). A rAF loop interpolates toward the scroll target so seeking stays
 * butter-smooth in both directions, and it stops exactly at the frame that
 * matches the scroll position.
 *
 * ------------------------- VIDEO ENCODING NOTES ---------------------------
 * The original source file had a single keyframe (at 0.0s). Browsers can only
 * start decoding from the nearest preceding keyframe, so scrubbing such a
 * file forces a full re-decode from the start on every seek — guaranteed
 * stutter. The assets in `public/videos/` were re-encoded for random access:
 *
 *   - H.264 + faststart (`moov` box first) so playback/seeking can start
 *     immediately without downloading the whole file.
 *   - A keyframe every 0.5s (`-g 12 -keyint_min 12 -sc_threshold 0` at 24fps)
 *     so no seek ever has to decode more than ~12 frames to land on a frame.
 *   - CRF-based bitrate (21 desktop / 24 mobile) — high visual quality
 *     without the excessive bitrate of the original (9 Mbps → ~6 Mbps).
 *   - Two renditions: `hero-desktop.mp4` (full 1168×768) and `hero-mobile.mp4`
 *     (832px wide) picked once at mount to keep memory/bandwidth light on
 *     phones. If you replace the videos, keep the same characteristics:
 *     web-optimized MP4/H.264, frequent keyframes, moderate bitrate, no
 *     oversized resolution.
 * --------------------------------------------------------------------------
 */

const VIDEO_DESKTOP = "/videos/hero-desktop.mp4";
const VIDEO_MOBILE = "/videos/hero-mobile.mp4";
const FALLBACK_IMAGE = "/images/hero.jpg";

/** Fallback duration (s) if metadata is somehow unavailable. */
const FALLBACK_DURATION = 9;

/** Vertical scroll distance per second of video — the cinematic "pace". */
const VH_PER_SECOND = 28;
const MIN_SCROLL_VH = 250;
const MAX_SCROLL_VH = 400;

/** Don't write currentTime unless it moved by more than half a frame. */
const SEEK_EPSILON = 1 / 48;
/** Exponential smoothing rate (1/s). Higher = more responsive, lower = smoother. */
const SMOOTHING_RATE = 14;

function scrollVhForDuration(duration) {
  const vh = Math.round(duration * VH_PER_SECOND);
  return Math.min(MAX_SCROLL_VH, Math.max(MIN_SCROLL_VH, vh));
}

function pickSource() {
  if (typeof window === "undefined") return VIDEO_DESKTOP;
  // Chosen once per mount: swapping sources mid-experience would flush the
  // already-buffered data and cause a seek stall.
  return window.matchMedia("(max-width: 767px)").matches
    ? VIDEO_MOBILE
    : VIDEO_DESKTOP;
}

/* ----------------------------- Static hero ------------------------------- */

/** Non-scroll-scrubbed hero: full-viewport image + existing typography.
 *  Used for `prefers-reduced-motion` users and as the video-failure fallback. */
function StaticHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-navy-950">
      <img
        src={FALLBACK_IMAGE}
        alt="Modern luxury villa with illuminated glass walls and an infinity pool at dusk"
        fetchpriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(6,15,26,0.25),rgba(6,15,26,0.65))]"
      />
      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        <h1 className="hero-in mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[64px]">
          Discover Exceptional
          <br />
          Homes &amp; Investments
        </h1>
        <p className="hero-in-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          Premium properties in prime locations. Find your dream home or the
          perfect investment with confidence.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- Scroll-driven hero --------------------------- */

function ScrollHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  // "loading" -> "ready" | "error"
  const [status, setStatus] = useState("loading");
  const [scrollVh, setScrollVh] = useState(() =>
    scrollVhForDuration(FALLBACK_DURATION)
  );
  const source = useRef(pickSource()).current;

  /* ---- Video readiness: aggressive preload + minimal loading state ---- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // Belt-and-braces for iOS: the muted attribute alone is occasionally
    // ignored before first load, which would block inline decoding.
    video.muted = true;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      // Jump straight to the frame that matches the current scroll position
      // (covers page restores / late reveals) so the video never "jumps in".
      const section = sectionRef.current;
      if (section && video.readyState >= 2) {
        const total = section.offsetHeight - window.innerHeight;
        const progress =
          total > 0
            ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total))
            : 0;
        if (progress > 0) {
          video.currentTime = progress * (video.duration || FALLBACK_DURATION);
        }
      }
      setStatus("ready");
    };

    const onLoadedMetadata = () => {
      const d = video.duration;
      if (Number.isFinite(d) && d > 0) setScrollVh(scrollVhForDuration(d));
    };
    const onError = () => setStatus("error");

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplaythrough", reveal);
    video.addEventListener("error", onError);

    // Slow-network / iOS fallback: canplaythrough can lag well behind
    // "decodable first frame". If we have at least HAVE_CURRENT_DATA after 8s,
    // start the experience anyway — remaining seeks will just buffer briefly.
    const fallbackTimer = window.setTimeout(() => {
      if (video.readyState >= 2) reveal();
    }, 8000);

    return () => {
      window.clearTimeout(fallbackTimer);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplaythrough", reveal);
      video.removeEventListener("error", onError);
    };
  }, []);

  /* ---- The scroll -> timeline scrubbing loop (only runs while in view) ---- */
  useEffect(() => {
    if (status !== "ready") return undefined;
    const section = sectionRef.current;
    const video = videoRef.current;
    const text = textRef.current;
    if (!section || !video) return undefined;

    const duration = video.duration || FALLBACK_DURATION;
    const state = { current: -1, last: 0 };
    let rafId = 0;
    let running = false;

    const tick = (now) => {
      if (!running) return;
      const dt = Math.min(0.1, (now - state.last) / 1000) || 0.016;
      state.last = now;

      // 1. Scroll position -> target timeline position (0% scroll = 0% video,
      //    100% scroll = 100% video; final frame only at the very end).
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const target = progress * duration;

      // 2. Time-based exponential smoothing toward the target: no jerky
      //    frame jumps, but tight enough (~70ms) to feel glued to the scroll.
      if (state.current < 0) {
        state.current = target; // first activation: no long catch-up lerp
      } else {
        state.current += (target - state.current) * (1 - Math.exp(-dt * SMOOTHING_RATE));
      }

      // 3. Only touch the decoder when the rendered frame would actually
      //    change — this is what prevents a seek flood.
      if (Math.abs(state.current - video.currentTime) > SEEK_EPSILON) {
        video.currentTime = Math.min(duration, Math.max(0, state.current));
      }

      // 4. Subtle text retreat: headline fades/lifts away over the first
      //    third of the scrub so the video stays visually dominant. Direct
      //    style writes — no React re-render per frame.
      if (text) {
        const f = Math.min(1, Math.max(0, (progress - 0.1) / 0.25));
        text.style.opacity = String(1 - f);
        text.style.transform = `translateY(${(-f * 3.5).toFixed(2)}vh)`;
        text.style.pointerEvents = f > 0.6 ? "none" : "";
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      state.last = performance.now();
      rafId = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(rafId);
    };

    // The loop only exists while the hero is near the viewport — scrolling
    // the rest of the page costs nothing.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "25% 0px" }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      stop();
    };
  }, [status]);

  // Video failure -> existing hero image, plain static section (req. 18).
  if (status === "error") return <StaticHero />;

  return (
    <section
      ref={sectionRef}
      aria-label="Hero: discover exceptional homes and investments"
      className="relative bg-navy-950"
      style={{ height: `${scrollVh + 100}vh` }}
    >
      {/* Sticky 100vh stage: pinned while the section's scroll track plays out */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fallback image sits underneath: it is the poster during loading
            and the visible hero if the video never arrives. */}
        <img
          src={FALLBACK_IMAGE}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          src={source}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
          tabIndex={-1}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            status === "ready" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Very subtle scrim — just enough for text legibility, the video
            stays visually dominant (req. 8). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,15,26,0.42),rgba(6,15,26,0.08)_45%,rgba(6,15,26,0.38))]"
        />

        {/* Existing typography — fades away as the scrub begins (req. 12).
            The wrapper carries the per-frame opacity/transform so the CSS
            entrance animations on the children keep working. */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
        >
          <h1 className="hero-in mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(6,15,26,0.45)] sm:text-5xl lg:text-[64px]">
            Discover Exceptional
            <br />
            Homes &amp; Investments
          </h1>
          <p className="hero-in-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(6,15,26,0.5)] sm:text-lg">
            Premium properties in prime locations. Find your dream home or the
            perfect investment with confidence.
          </p>
        </div>

        {/* Minimal premium loading treatment (req. 17) */}
        {status === "loading" && (
          <div className="pointer-events-none absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
              Preparing the experience
            </span>
            <span className="hero-loader" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}

export default function Hero() {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return reducedMotion ? <StaticHero /> : <ScrollHero />;
}
