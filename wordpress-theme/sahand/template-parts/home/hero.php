<?php
/**
 * Home: scroll-scrubbed hero.
 *
 * @package Sahand
 */

$sahand_uri  = get_template_directory_uri();
$sahand_head = 'گروه ساختمانی سهند';
$sahand_h1   = 'امضای پروژه‌های مسکونی لوکس در کرج';
$sahand_sub  = 'برای خریداران خاص، سرمایه‌گذاران ملکی و مالکان زمین؛ تجربه‌ای دقیق از انتخاب موقعیت، طراحی، اجرا و تحویل — شفاف، خوش‌ساخت و قابل اعتماد.';
?>
<section
	data-hero-scrub
	aria-label="بخش آغازین — گروه ساختمانی سهند، پروژه‌های مسکونی لوکس در کرج"
	class="relative bg-navy-950"
	style="height: 350vh"
>
	<div class="sticky top-0 h-screen w-full overflow-hidden">
		<img
			src="<?php echo esc_url( $sahand_uri . '/assets/images/hero.jpg' ); ?>"
			alt=""
			aria-hidden="true"
			fetchpriority="high"
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<video
			data-hero-video
			data-src-desktop="<?php echo esc_url( $sahand_uri . '/assets/videos/hero-desktop.mp4' ); ?>"
			data-src-mobile="<?php echo esc_url( $sahand_uri . '/assets/videos/hero-mobile.mp4' ); ?>"
			muted
			playsinline
			preload="auto"
			disablepictureinpicture
			tabindex="-1"
			aria-hidden="true"
			class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
		></video>

		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,15,26,0.42),rgba(6,15,26,0.08)_45%,rgba(6,15,26,0.38))]"
		></div>

		<div data-hero-text class="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
			<h1 class="hero-in mx-auto max-w-4xl text-4xl font-bold leading-[1.25] text-white drop-shadow-[0_2px_18px_rgba(6,15,26,0.45)] sm:text-5xl lg:text-[56px]">
				<?php echo esc_html( $sahand_head ); ?>
				<br />
				<?php echo esc_html( $sahand_h1 ); ?>
			</h1>
			<p class="hero-in-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(6,15,26,0.5)] sm:text-lg">
				<?php echo esc_html( $sahand_sub ); ?>
			</p>
		</div>

		<div data-hero-loader class="pointer-events-none absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
			<span class="text-[11px] font-semibold tracking-[0.2em] text-white/70">در حال آماده‌سازی تجربه</span>
			<span class="hero-loader" aria-hidden="true"></span>
		</div>
	</div>
</section>

<section data-hero-static class="relative hidden h-screen overflow-hidden bg-navy-950">
	<img
		src="<?php echo esc_url( $sahand_uri . '/assets/images/hero.jpg' ); ?>"
		alt="ویلای لوکس مدرن با دیوارهای شیشه‌ای روشن و استخر بی‌نهایت در غروب"
		fetchpriority="high"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(6,15,26,0.25),rgba(6,15,26,0.65))]"></div>
	<div class="container-x relative flex h-full flex-col items-center justify-center text-center">
		<h1 class="hero-in mx-auto max-w-4xl text-4xl font-bold leading-[1.25] text-white sm:text-5xl lg:text-[56px]">
			<?php echo esc_html( $sahand_head ); ?>
			<br />
			<?php echo esc_html( $sahand_h1 ); ?>
		</h1>
		<p class="hero-in-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
			<?php echo esc_html( $sahand_sub ); ?>
		</p>
	</div>
</section>
