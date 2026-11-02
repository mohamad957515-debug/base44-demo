<?php
/**
 * Home: four-step process.
 *
 * @package Sahand
 */

$sahand_steps = sahand_process();
?>
<section id="process" class="scroll-mt-24 bg-ivory py-20 lg:py-28">
	<div class="container-x">
		<div class="reveal text-center" data-reveal>
			<p class="label-gold">روند همکاری</p>
			<h2 class="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
				از اولین تماس تا تصمیم نهایی
			</h2>
			<p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/60">
				مسیر کوتاه و روشن است؛ در هر گام می‌دانید اقدام بعدی چیست.
			</p>
		</div>

		<div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
			<?php foreach ( $sahand_steps as $sahand_i => $sahand_step ) : ?>
				<div class="reveal" data-reveal data-delay="<?php echo esc_attr( $sahand_i * 80 ); ?>">
					<div class="group h-full rounded-2xl bg-white p-7 shadow-card transition-colors duration-300 hover:bg-navy">
						<span class="text-sm font-bold tracking-widest text-gold"><?php echo esc_html( $sahand_step['number'] ); ?></span>
						<h3 class="mt-4 text-lg font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-white">
							<?php echo esc_html( $sahand_step['title'] ); ?>
						</h3>
						<p class="mt-3 text-sm leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-white/65">
							<?php echo esc_html( $sahand_step['text'] ); ?>
						</p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
