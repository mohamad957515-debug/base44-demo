<?php
/**
 * Home: about section.
 *
 * @package Sahand
 */

$sahand_photos = sahand_about_photos();
?>
<section id="about" class="scroll-mt-24 bg-white py-20 lg:py-28">
	<div class="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
		<div class="reveal" data-reveal>
			<p class="label-gold">درباره ما</p>
			<h2 class="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
				امضای پروژه‌های لوکس در کرج
			</h2>
			<p class="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
				سهند فقط یک سازنده نیست؛ تیمی اجرایی و مشاوره‌ای است که زمین، سرمایه
				یا نیاز سکونتی شما را به دارایی خوش‌ساخت و قابل اتکا تبدیل می‌کند.
				تمرکز ما پروژه‌های سطح یک کرج، مهرشهر و البرز است.
			</p>
			<a href="<?php echo esc_url( sahand_projects_url() ); ?>" class="btn-primary mt-9">
				مشاهده پروژه‌ها
				<?php sahand_the_icon( 'arrow-left', 16 ); ?>
			</a>
		</div>

		<div class="reveal" data-reveal data-delay="120">
			<div class="group relative">
				<div class="grid grid-cols-5 items-end gap-4">
					<div class="col-span-3 overflow-hidden rounded-2xl">
						<img
							src="<?php echo esc_url( $sahand_photos['primary'] ); ?>"
							alt="پروژه مسکونی لوکس گروه ساختمانی سهند در کرج"
							loading="lazy"
							class="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						/>
					</div>
					<div class="col-span-2 overflow-hidden rounded-2xl pb-10">
						<img
							src="<?php echo esc_url( $sahand_photos['secondary'] ); ?>"
							alt="نمای پروژه لادن گروه ساختمانی سهند"
							loading="lazy"
							class="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						/>
					</div>
				</div>
				<a
					href="<?php echo esc_url( sahand_projects_url() ); ?>"
					aria-label="مشاهده پروژه‌های سهند"
					class="absolute bottom-2 left-6 grid h-14 w-14 place-items-center rounded-full bg-gold text-navy-950 shadow-card transition-all duration-300 hover:bg-navy hover:text-white sm:left-10"
				>
					<?php sahand_the_icon( 'arrow-left', 20, 'transition-transform duration-300 group-hover:-translate-x-0.5' ); ?>
				</a>
			</div>
		</div>
	</div>
</section>
