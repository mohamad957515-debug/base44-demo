<?php
/**
 * Home: credibility section with stats.
 *
 * @package Sahand
 */

$sahand_points = sahand_why_points();
$sahand_stats  = sahand_stats();
?>
<section class="relative overflow-hidden bg-navy py-20 lg:py-28">
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_10%,rgba(70,110,151,0.35),transparent)]"></div>
	<div class="container-x relative grid gap-14 lg:grid-cols-2 lg:gap-20">
		<div class="reveal" data-reveal>
			<p class="label-gold">چرا سهند</p>
			<h2 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
				استانداردی بالاتر
				<br />
				از معمول
			</h2>
			<p class="mt-6 max-w-md text-base leading-relaxed text-white/65">
				سهند پروژه را از زاویه سرمایه، سکونت، کیفیت و برند نهایی بررسی
				می‌کند — و مسیر تصمیم را از اولین تماس تا تحویل شفاف نگه می‌دارد.
			</p>
			<ul class="mt-8 space-y-4">
				<?php foreach ( $sahand_points as $sahand_point ) : ?>
					<li class="flex items-start gap-3 text-sm text-white/80">
						<span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/50">
							<?php sahand_the_icon( 'check', 11, 'text-gold' ); ?>
						</span>
						<?php echo esc_html( $sahand_point ); ?>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>

		<div class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
			<?php foreach ( $sahand_stats as $sahand_i => $sahand_stat ) : ?>
				<div class="reveal" data-reveal data-delay="<?php echo esc_attr( $sahand_i * 80 ); ?>">
					<div class="flex h-full flex-col justify-center bg-navy-950/40 p-8 lg:p-10">
						<p class="text-3xl font-bold tracking-tight text-gold lg:text-4xl"><?php echo esc_html( $sahand_stat['value'] ); ?></p>
						<p class="mt-2 text-xs font-semibold text-white/60"><?php echo esc_html( $sahand_stat['label'] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
