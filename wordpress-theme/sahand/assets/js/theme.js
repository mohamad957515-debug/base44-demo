/* eslint-disable */
/**
 * Sahand theme interactions — ports the React app's behaviour to vanilla JS:
 * sticky header, mobile menu, scroll-reveal, scroll-scrubbed hero, project
 * carousel, gallery/lightbox, favorites, project filters and modals.
 */
(function () {
	"use strict";

	var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------------- Header & mobile menu ---------------- */
	function initHeader() {
		var header = document.getElementById("site-header");
		var menu = document.getElementById("mobile-menu");
		var toggle = document.getElementById("menu-toggle");
		if (!header) return;

		var isFront = header.getAttribute("data-solid") === "false";

		function setSolid() {
			var solid = !isFront || window.scrollY > 40;
			header.setAttribute("data-solid", solid ? "true" : "false");
		}

		setSolid();
		window.addEventListener("scroll", setSolid, { passive: true });

		if (!menu || !toggle) return;
		var iconMenu = toggle.querySelector(".js-icon-menu");
		var iconClose = toggle.querySelector(".js-icon-close");

		function setOpen(open) {
			menu.classList.toggle("hidden", !open);
			menu.classList.toggle("flex", open);
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
			toggle.setAttribute("aria-label", open ? "بستن منو" : "باز کردن منو");
			if (iconMenu) iconMenu.classList.toggle("hidden", open);
			if (iconClose) iconClose.classList.toggle("hidden", !open);
			document.body.style.overflow = open ? "hidden" : "";
		}

		toggle.addEventListener("click", function () {
			setOpen(menu.classList.contains("hidden"));
		});

		menu.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				setOpen(false);
			});
		});
	}

	/* ---------------- Scroll reveal ---------------- */
	function initReveal() {
		var items = document.querySelectorAll("[data-reveal]");
		if (!items.length) return;

		if (reducedMotion || !("IntersectionObserver" in window)) {
			items.forEach(function (el) {
				el.classList.add("is-visible");
			});
			return;
		}

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					var delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
					if (delay) entry.target.style.transitionDelay = delay + "ms";
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
		);

		items.forEach(function (el) {
			observer.observe(el);
		});
	}

	/* ---------------- Scroll-scrubbed hero ---------------- */
	function initHero() {
		var hero = document.querySelector("[data-hero-scrub]");
		var staticHero = document.querySelector("[data-hero-static]");
		if (!hero) return;

		var video = hero.querySelector("[data-hero-video]");
		var text = hero.querySelector("[data-hero-text]");
		var loader = hero.querySelector("[data-hero-loader]");

		function showStatic() {
			hero.classList.add("hidden");
			if (staticHero) staticHero.classList.remove("hidden");
		}

		if (reducedMotion || !video) {
			showStatic();
			return;
		}

		var isMobile = window.matchMedia("(max-width: 767px)").matches;
		video.src = isMobile ? video.getAttribute("data-src-mobile") : video.getAttribute("data-src-desktop");
		video.muted = true;

		var status = "loading";
		var duration = 9;

		function ready() {
			if (status === "ready") return;
			status = "ready";
			video.classList.remove("opacity-0");
			video.classList.add("opacity-100");
			if (loader) loader.remove();
			startLoop();
		}

		video.addEventListener("loadedmetadata", function () {
			if (Number.isFinite(video.duration) && video.duration > 0) {
				duration = video.duration;
				var vh = Math.round(duration * 28);
				vh = Math.min(400, Math.max(250, vh));
				hero.style.height = vh + 100 + "vh";
			}
		});
		video.addEventListener("canplaythrough", ready, { once: true });
		video.addEventListener("error", showStatic);

		window.setTimeout(function () {
			if (video.readyState >= 2) ready();
		}, 8000);

		function startLoop() {
			var current = -1;
			var last = 0;
			var running = false;
			var rafId = 0;
			var epsilon = 1 / 48;
			var smoothing = 14;

			function tick(now) {
				if (!running) return;
				var dt = Math.min(0.1, (now - last) / 1000) || 0.016;
				last = now;

				var rect = hero.getBoundingClientRect();
				var total = rect.height - window.innerHeight;
				var progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
				var target = progress * duration;

				if (current < 0) {
					current = target;
				} else {
					current += (target - current) * (1 - Math.exp(-dt * smoothing));
				}

				if (Math.abs(current - video.currentTime) > epsilon) {
					video.currentTime = Math.min(duration, Math.max(0, current));
				}

				if (text) {
					var f = Math.min(1, Math.max(0, (progress - 0.1) / 0.25));
					text.style.opacity = String(1 - f);
					text.style.transform = "translateY(" + (-f * 3.5).toFixed(2) + "vh)";
					text.style.pointerEvents = f > 0.6 ? "none" : "";
				}

				rafId = window.requestAnimationFrame(tick);
			}

			function start() {
				if (running) return;
				running = true;
				last = performance.now();
				rafId = window.requestAnimationFrame(tick);
			}

			function stop() {
				running = false;
				window.cancelAnimationFrame(rafId);
			}

			if ("IntersectionObserver" in window) {
				new IntersectionObserver(
					function (entries) {
						if (entries[0].isIntersecting) start();
						else stop();
					},
					{ rootMargin: "25% 0px" }
				).observe(hero);
			} else {
				start();
			}
		}
	}

	/* ---------------- Featured carousel ---------------- */
	function initCarousels() {
		document.querySelectorAll("[data-carousel-track]").forEach(function (track) {
			var scope = track.closest("section") || document;
			var slides = Array.prototype.slice.call(track.querySelectorAll("[data-carousel-slide]"));
			var dots = Array.prototype.slice.call(scope.querySelectorAll("[data-carousel-dot]"));
			var prev = scope.querySelector("[data-carousel-prev]");
			var next = scope.querySelector("[data-carousel-next]");
			if (slides.length < 2) return;

			var rtl = getComputedStyle(track).direction === "rtl";

			function currentIndex() {
				var trackRect = track.getBoundingClientRect();
				var best = 0;
				var bestDistance = Infinity;
				slides.forEach(function (slide, i) {
					var rect = slide.getBoundingClientRect();
					var distance = rtl ? Math.abs(rect.right - trackRect.right) : Math.abs(rect.left - trackRect.left);
					if (distance < bestDistance) {
						bestDistance = distance;
						best = i;
					}
				});
				return best;
			}

			function goTo(index) {
				var slide = slides[index];
				if (!slide) return;
				var trackRect = track.getBoundingClientRect();
				var rect = slide.getBoundingClientRect();
				var delta = rtl ? rect.right - trackRect.right : rect.left - trackRect.left;
				track.scrollBy({ left: delta, behavior: reducedMotion ? "auto" : "smooth" });
			}

			function syncDots() {
				var active = currentIndex();
				dots.forEach(function (dot, i) {
					var isActive = i === active;
					dot.classList.toggle("w-6", isActive);
					dot.classList.toggle("bg-navy", isActive);
					dot.classList.toggle("w-1.5", !isActive);
					dot.classList.toggle("bg-navy/20", !isActive);
					dot.setAttribute("aria-current", isActive ? "true" : "false");
				});
			}

			if (prev) {
				prev.addEventListener("click", function () {
					goTo(currentIndex() - 1);
				});
			}
			if (next) {
				next.addEventListener("click", function () {
					goTo(currentIndex() + 1);
				});
			}
			dots.forEach(function (dot, i) {
				dot.addEventListener("click", function () {
					goTo(i);
				});
			});

			var scrollTimer = 0;
			track.addEventListener(
				"scroll",
				function () {
					window.clearTimeout(scrollTimer);
					scrollTimer = window.setTimeout(syncDots, 80);
				},
				{ passive: true }
			);

			track.addEventListener("keydown", function (event) {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					goTo(currentIndex() + 1);
				}
				if (event.key === "ArrowRight") {
					event.preventDefault();
					goTo(currentIndex() - 1);
				}
			});

			syncDots();
		});
	}

	/* ---------------- Gallery & lightbox ---------------- */
	function initGallery() {
		var gallery = document.querySelector("[data-gallery]");
		if (!gallery) return;

		var main = gallery.querySelector("[data-gallery-main]");
		var thumbs = Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-thumb]"));
		var lightbox = document.querySelector("[data-lightbox]");
		var lightboxImage = lightbox ? lightbox.querySelector("[data-lightbox-image]") : null;
		var counter = lightbox ? lightbox.querySelector("[data-lightbox-counter]") : null;
		var index = 0;

		function faNum(value) {
			return String(value).replace(/[0-9]/g, function (d) {
				return "۰۱۲۳۴۵۶۷۸۹"[Number(d)];
			});
		}

		function setActive(i) {
			index = (i + thumbs.length) % thumbs.length;
			var src = thumbs[index].getAttribute("data-src");
			if (main) {
				main.src = src;
				main.classList.remove("gallery-img");
				void main.offsetWidth;
				main.classList.add("gallery-img");
			}
			thumbs.forEach(function (thumb, t) {
				var isActive = t === index;
				thumb.classList.toggle("ring-2", isActive);
				thumb.classList.toggle("ring-gold", isActive);
				thumb.classList.toggle("ring-offset-2", isActive);
				thumb.classList.toggle("opacity-70", !isActive);
				thumb.setAttribute("aria-current", isActive ? "true" : "false");
			});
			if (lightboxImage) lightboxImage.src = src;
			if (counter) counter.textContent = faNum(index + 1) + " / " + faNum(thumbs.length);
		}

		thumbs.forEach(function (thumb, i) {
			thumb.addEventListener("click", function () {
				setActive(i);
			});
		});

		if (!lightbox) return;

		function openLightbox() {
			lightbox.classList.remove("hidden");
			lightbox.classList.add("flex");
			document.body.style.overflow = "hidden";
		}

		function closeLightbox() {
			lightbox.classList.add("hidden");
			lightbox.classList.remove("flex");
			document.body.style.overflow = "";
		}

		var opener = gallery.querySelector("[data-lightbox-open]");
		if (opener) opener.addEventListener("click", openLightbox);

		var closeBtn = lightbox.querySelector("[data-lightbox-close]");
		if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

		var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
		if (prevBtn) prevBtn.addEventListener("click", function () { setActive(index - 1); });

		var nextBtn = lightbox.querySelector("[data-lightbox-next]");
		if (nextBtn) nextBtn.addEventListener("click", function () { setActive(index + 1); });

		lightbox.addEventListener("click", function (event) {
			if (event.target === lightbox) closeLightbox();
		});

		document.addEventListener("keydown", function (event) {
			if (lightbox.classList.contains("hidden")) return;
			if (event.key === "Escape") closeLightbox();
			if (event.key === "ArrowLeft") setActive(index + 1);
			if (event.key === "ArrowRight") setActive(index - 1);
		});
	}

	/* ---------------- Favorites (localStorage) ---------------- */
	function initFavorites() {
		var key = "sahand-favorites";
		var favorites = [];

		try {
			favorites = JSON.parse(localStorage.getItem(key) || "[]");
			if (!Array.isArray(favorites)) favorites = [];
		} catch (error) {
			favorites = [];
		}

		var buttons = document.querySelectorAll(".js-favorite");
		if (!buttons.length) return;

		function sync(button) {
			var id = button.getAttribute("data-project-id");
			var active = favorites.indexOf(id) !== -1;
			button.setAttribute("aria-pressed", active ? "true" : "false");
			button.setAttribute("aria-label", active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها");
			button.classList.toggle("is-fav", active);
			var label = button.querySelector(".js-favorite-label");
			if (label) label.textContent = active ? "ذخیره شد" : "ذخیره";
		}

		buttons.forEach(function (button) {
			sync(button);
			button.addEventListener("click", function (event) {
				event.preventDefault();
				event.stopPropagation();
				var id = button.getAttribute("data-project-id");
				if (favorites.indexOf(id) === -1) favorites.push(id);
				else favorites = favorites.filter(function (item) { return item !== id; });
				try {
					localStorage.setItem(key, JSON.stringify(favorites));
				} catch (error) {
					/* storage unavailable — favorites stay in memory */
				}
				sync(button);
			});
		});
	}

	/* ---------------- Project filters ---------------- */
	function initFilters() {
		var bar = document.querySelector("[data-project-filters]");
		var grid = document.querySelector("[data-project-grid]");
		if (!bar || !grid) return;

		var query = bar.querySelector("[data-filter-query]");
		var location = bar.querySelector("[data-filter-location]");
		var type = bar.querySelector("[data-filter-type]");
		var sort = bar.querySelector("[data-filter-sort]");
		var counter = document.querySelector("[data-results-count]");
		var empty = document.querySelector("[data-empty-state]");
		var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-project-card]"));
		var resets = document.querySelectorAll("[data-filter-reset]");

		function normalize(value) {
			return (value || "").toString().trim().toLowerCase();
		}

		function apply() {
			var q = normalize(query && query.value);
			var city = location ? location.value : "all";
			var kind = type ? type.value : "all";
			var visible = 0;

			cards.forEach(function (card) {
				var matchesQuery = !q || normalize(card.getAttribute("data-name")).indexOf(q) !== -1;
				var matchesCity = city === "all" || card.getAttribute("data-location") === city;
				var matchesType = kind === "all" || card.getAttribute("data-type") === kind;
				var show = matchesQuery && matchesCity && matchesType;
				card.classList.toggle("hidden", !show);
				if (show) visible++;
			});

			var order = cards.slice();
			if (sort && sort.value === "newest") {
				order.sort(function (a, b) {
					return (b.getAttribute("data-date") || "").localeCompare(a.getAttribute("data-date") || "");
				});
			} else {
				order.sort(function (a, b) {
					return (
						Number(b.getAttribute("data-featured")) - Number(a.getAttribute("data-featured")) ||
						cards.indexOf(a) - cards.indexOf(b)
					);
				});
			}
			order.forEach(function (card) {
				grid.appendChild(card);
			});

			if (counter) {
				counter.textContent = String(visible).replace(/[0-9]/g, function (d) {
					return "۰۱۲۳۴۵۶۷۸۹"[Number(d)];
				});
			}
			if (empty) {
				empty.classList.toggle("hidden", visible !== 0);
				empty.classList.toggle("flex", visible === 0);
			}

			var dirty =
				(q && q.length > 0) ||
				(city && city !== "all") ||
				(kind && kind !== "all") ||
				(sort && sort.value !== "featured");
			resets.forEach(function (button) {
				if (button.classList.contains("btn-primary")) return;
				button.classList.toggle("hidden", !dirty);
				button.classList.toggle("inline-flex", !!dirty);
			});
		}

		[query, location, type, sort].forEach(function (control) {
			if (!control) return;
			control.addEventListener("input", apply);
			control.addEventListener("change", apply);
		});

		resets.forEach(function (button) {
			button.addEventListener("click", function () {
				if (query) query.value = "";
				if (location) location.value = "all";
				if (type) type.value = "all";
				if (sort) sort.value = "featured";
				apply();
			});
		});

		apply();
	}

	/* ---------------- Modals & scroll targets ---------------- */
	function initModals() {
		var modal = document.querySelector("[data-viewing-modal]");
		if (modal) {
			function open() {
				modal.classList.remove("hidden");
				modal.classList.add("flex");
				document.body.style.overflow = "hidden";
			}
			function close() {
				modal.classList.add("hidden");
				modal.classList.remove("flex");
				document.body.style.overflow = "";
			}

			document.querySelectorAll("[data-viewing-open]").forEach(function (button) {
				button.addEventListener("click", open);
			});
			document.querySelectorAll("[data-viewing-close]").forEach(function (button) {
				button.addEventListener("click", close);
			});
			modal.addEventListener("click", function (event) {
				if (event.target === modal) close();
			});
			document.addEventListener("keydown", function (event) {
				if (event.key === "Escape" && !modal.classList.contains("hidden")) close();
			});
		}

		document.querySelectorAll("[data-scroll-to-consultation]").forEach(function (link) {
			link.addEventListener("click", function (event) {
				var target = document.getElementById("consultation");
				if (!target) return;
				event.preventDefault();
				target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
			});
		});
	}

	function boot() {
		initHeader();
		initReveal();
		initHero();
		initCarousels();
		initGallery();
		initFavorites();
		initFilters();
		initModals();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", boot);
	} else {
		boot();
	}
})();
