<?php
/**
 * Fallback template (blog index, search results).
 *
 * @package Sahand
 */

get_header();
?>

<section class="bg-white pb-20 pt-32 lg:pb-28 lg:pt-40">
	<div class="container-x">
		<h1 class="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
			<?php
			if ( is_search() ) {
				echo esc_html( 'نتایج جست‌وجو برای «' . get_search_query() . '»' );
			} elseif ( is_home() && ! is_front_page() ) {
				single_post_title();
			} else {
				echo esc_html( 'آخرین مطالب' );
			}
			?>
		</h1>

		<?php if ( have_posts() ) : ?>
			<div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				<?php while ( have_posts() ) : ?>
					<?php the_post(); ?>
					<article class="rounded-2xl bg-white p-6 shadow-card">
						<h2 class="text-xl font-bold text-navy">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</h2>
						<p class="mt-3 text-sm leading-relaxed text-ink/60"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
					</article>
				<?php endwhile; ?>
			</div>
			<div class="mt-12"><?php the_posts_pagination(); ?></div>
		<?php else : ?>
			<p class="mt-6 text-sm text-ink/60">موردی پیدا نشد.</p>
		<?php endif; ?>
	</div>
</section>

<?php
get_footer();
