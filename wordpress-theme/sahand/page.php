<?php
/**
 * Default page template.
 *
 * @package Sahand
 */

get_header();
?>

<section class="bg-white pb-20 pt-32 lg:pb-28 lg:pt-40">
	<div class="container-x">
		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>
			<nav aria-label="مسیر صفحه" class="flex items-center gap-1.5 text-xs font-medium text-ink/50">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="transition-colors hover:text-navy">خانه</a>
				<?php sahand_the_icon( 'chevron-left', 12 ); ?>
				<span class="text-navy"><?php the_title(); ?></span>
			</nav>
			<h1 class="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl"><?php the_title(); ?></h1>
			<div class="prose mt-8 max-w-3xl leading-relaxed text-ink/70">
				<?php the_content(); ?>
			</div>
		<?php endwhile; ?>
	</div>
</section>

<?php
get_footer();
