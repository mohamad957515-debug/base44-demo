<?php
/**
 * Home: featured projects carousel.
 *
 * @package Sahand
 */

$sahand_query = new WP_Query(
	array(
		'post_type'      => 'project',
		'posts_per_page' => 6,
		'orderby'        => 'menu_order date',
		'order'          => 'ASC',
		'meta_query'     => array(
			array(
				'key'   => '_sahand_featured',
				'value' => '1',
			),
		),
	)
);

if ( ! $sahand_query->have_posts() ) {
	$sahand_query = new WP_Query(
		array(
			'post_type'      => 'project',
			'posts_per_page' => 6,
		)
	);
}

if ( ! $sahand_query->have_posts() ) {
	return;
}
?>
<section id="featured" class="bg-ivory py-20 lg:py-28">
	<div class="container-x">
		<div class="reveal text-center" data-reveal>
			<p class="label-gold">پروژه‌ها</p>
			<h2 class="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
				پروژه‌های شاخص
			</h2>
		</div>
	</div>

	<div class="relative mt-12 lg:mt-16">
		<div class="overflow-hidden" role="group" aria-roledescription="carousel" aria-label="پروژه‌های شاخص">
			<div
				data-carousel-track
				class="container-x flex cursor-grab gap-6 overflow-x-auto scroll-smooth pb-2 active:cursor-grabbing lg:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				<?php
				$sahand_index = 0;
				while ( $sahand_query->have_posts() ) :
					$sahand_query->the_post();
					?>
					<div class="shrink-0 pl-1 pr-1 <?php echo 0 === $sahand_index ? 'w-[86vw] sm:w-[540px] lg:w-[620px]' : 'w-[78vw] sm:w-[380px] lg:w-[400px]'; ?>">
						<div class="reveal" data-reveal data-delay="<?php echo esc_attr( $sahand_index * 70 ); ?>" data-carousel-slide>
							<?php sahand_project_card( get_the_ID(), 0 === $sahand_index ); ?>
						</div>
					</div>
					<?php
					$sahand_index++;
				endwhile;
				wp_reset_postdata();
				?>
			</div>
		</div>

		<button
			type="button"
			data-carousel-prev
			aria-label="پروژه قبلی"
			class="absolute right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-navy/10 bg-white text-navy shadow-card transition-all duration-300 hover:bg-navy hover:text-white lg:grid"
		>
			<?php sahand_the_icon( 'arrow-right', 18 ); ?>
		</button>
		<button
			type="button"
			data-carousel-next
			aria-label="پروژه بعدی"
			class="absolute left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-navy/10 bg-white text-navy shadow-card transition-all duration-300 hover:bg-navy hover:text-white lg:grid"
		>
			<?php sahand_the_icon( 'arrow-left', 18 ); ?>
		</button>
	</div>

	<div data-carousel-dots class="mt-8 flex justify-center gap-2 lg:hidden">
		<?php for ( $sahand_dot = 0; $sahand_dot < $sahand_index; $sahand_dot++ ) : ?>
			<button
				type="button"
				data-carousel-dot="<?php echo esc_attr( $sahand_dot ); ?>"
				aria-label="<?php echo esc_attr( 'رفتن به پروژه ' . sahand_fa_num( $sahand_dot + 1 ) ); ?>"
				aria-current="<?php echo 0 === $sahand_dot ? 'true' : 'false'; ?>"
				class="h-1.5 w-1.5 rounded-full bg-navy/20 transition-all duration-300"
			></button>
		<?php endfor; ?>
	</div>
</section>
