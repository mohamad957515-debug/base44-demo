<?php
/**
 * Home: compact call-to-action band.
 *
 * @package Sahand
 */
?>
<section class="bg-navy-50 py-16 lg:py-24">
	<div class="container-x">
		<div class="reveal" data-reveal>
			<div class="flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-right">
				<div class="flex flex-col items-center gap-7 sm:flex-row lg:items-center">
					<span class="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-navy text-gold shadow-card">
						<?php sahand_the_icon( 'key', 26 ); ?>
					</span>
					<div>
						<h2 class="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
							برای بازدید، پیش‌خرید یا مشارکت در ساخت مشاوره بگیرید
						</h2>
						<p class="mt-2 text-base text-ink/60">
							با یک تماس، مسیر مناسب شما مشخص می‌شود — خرید، پیش‌خرید،
							سرمایه‌گذاری یا مشارکت در ساخت.
						</p>
					</div>
				</div>
				<a href="<?php echo esc_url( sahand_contact_url() ); ?>" class="btn-primary shrink-0">
					تماس با سهند
					<?php sahand_the_icon( 'arrow-left', 16 ); ?>
				</a>
			</div>
		</div>
	</div>
</section>
