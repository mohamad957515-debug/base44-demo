<?php
/**
 * Home: services grid.
 *
 * @package Sahand
 */

$sahand_services = sahand_services();
?>
<section id="services" class="scroll-mt-24 bg-white py-20 lg:py-28">
	<div class="container-x">
		<div class="grid gap-8 lg:grid-cols-2 lg:items-end">
			<div class="reveal" data-reveal>
				<p class="label-gold">چه می‌کنیم</p>
				<h2 class="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
					از انتخاب مسیر تا تحویل کلید
				</h2>
			</div>
			<div class="reveal" data-reveal data-delay="100">
				<p class="max-w-md text-base leading-relaxed text-ink/60 lg:ml-auto">
					سهند پروژه را از زاویه سرمایه، سکونت، کیفیت و برند نهایی بررسی
					می‌کند — خدمات ما این مسیر را برای شما شفاف می‌کند.
				</p>
			</div>
		</div>

		<div class="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
			<?php foreach ( $sahand_services as $sahand_i => $sahand_service ) : ?>
				<div class="reveal" data-reveal data-delay="<?php echo esc_attr( ( $sahand_i % 3 ) * 90 ); ?>">
					<div class="group border-t border-navy/10 pt-6 transition-colors duration-300 hover:border-gold">
						<span class="text-sm font-bold tracking-widest text-gold"><?php echo esc_html( $sahand_service['number'] ); ?></span>
						<h3 class="mt-3 text-xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-gold">
							<?php echo esc_html( $sahand_service['title'] ); ?>
						</h3>
						<p class="mt-3 text-sm leading-relaxed text-ink/60">
							<?php echo esc_html( $sahand_service['text'] ); ?>
						</p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
