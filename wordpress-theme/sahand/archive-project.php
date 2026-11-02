<?php
/**
 * Projects archive with client-side filtering.
 *
 * @package Sahand
 */

get_header();

$sahand_locations = array();
$sahand_types     = array();
$sahand_projects  = new WP_Query(
	array(
		'post_type'      => 'project',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order date',
		'order'          => 'ASC',
	)
);

while ( $sahand_projects->have_posts() ) {
	$sahand_projects->the_post();
	$sahand_meta = sahand_project_meta( get_the_ID() );
	if ( $sahand_meta['city'] && ! in_array( $sahand_meta['city'], $sahand_locations, true ) ) {
		$sahand_locations[] = $sahand_meta['city'];
	}
	if ( $sahand_meta['type'] && ! in_array( $sahand_meta['type'], $sahand_types, true ) ) {
		$sahand_types[] = $sahand_meta['type'];
	}
}
wp_reset_postdata();

$sahand_archive = new WP_Query(
	array(
		'post_type'      => 'project',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order date',
		'order'          => 'ASC',
	)
);

$sahand_total = $sahand_archive->found_posts;
sort( $sahand_locations, SORT_LOCALE_STRING );
sort( $sahand_types, SORT_LOCALE_STRING );
?>

<section class="relative overflow-hidden bg-navy-950 pb-16 pt-32 lg:pb-20 lg:pt-40">
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(21,52,87,0.9),transparent)]"></div>
	<div class="container-x relative text-center">
		<p class="label-gold">پروژه‌های ما</p>
		<h1 class="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
			پروژه‌های گروه ساختمانی سهند
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-white/60">
			پروژه‌های شاخص در کرج، مهرشهر و البرز را مرور کنید — بر اساس منطقه و
			نوع پروژه فیلتر کنید.
		</p>
	</div>
</section>

<section class="bg-ivory py-14 lg:py-20">
	<div class="container-x">
		<div class="rounded-2xl bg-white p-5 shadow-card sm:p-6" data-project-filters>
			<div class="flex items-center gap-2 pb-4 text-xs font-bold text-navy/50">
				<?php sahand_the_icon( 'sliders', 14 ); ?>
				جست‌وجو را دقیق‌تر کنید
			</div>
			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				<div class="relative sm:col-span-2 lg:col-span-2 xl:col-span-2">
					<span class="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-navy/40">
						<?php sahand_the_icon( 'search', 16 ); ?>
					</span>
					<label for="filter-query" class="sr-only">جست‌وجوی پروژه</label>
					<input
						id="filter-query"
						data-filter-query
						type="search"
						placeholder="جست‌وجو بر اساس نام یا منطقه…"
						class="field ps-11"
					/>
				</div>

				<label for="filter-location" class="sr-only">مکان</label>
				<select id="filter-location" data-filter-location class="field cursor-pointer appearance-none pe-8">
					<option value="all">همه مناطق</option>
					<?php foreach ( $sahand_locations as $sahand_location ) : ?>
						<option value="<?php echo esc_attr( $sahand_location ); ?>"><?php echo esc_html( $sahand_location ); ?></option>
					<?php endforeach; ?>
				</select>

				<label for="filter-type" class="sr-only">نوع پروژه</label>
				<select id="filter-type" data-filter-type class="field cursor-pointer appearance-none pe-8">
					<option value="all">همه انواع</option>
					<?php foreach ( $sahand_types as $sahand_type ) : ?>
						<option value="<?php echo esc_attr( $sahand_type ); ?>"><?php echo esc_html( $sahand_type ); ?></option>
					<?php endforeach; ?>
				</select>

				<label for="filter-sort" class="sr-only">مرتب‌سازی</label>
				<select id="filter-sort" data-filter-sort class="field cursor-pointer appearance-none pe-8">
					<option value="featured">ابتدا پروژه‌های شاخص</option>
					<option value="newest">جدیدترین پروژه‌ها</option>
				</select>
			</div>
		</div>

		<div class="mt-10 flex items-center justify-between gap-4">
			<p class="text-sm font-medium text-ink/60" aria-live="polite">
				نمایش
				<span class="font-bold text-navy" data-results-count><?php echo esc_html( sahand_fa_num( $sahand_total ) ); ?></span>
				از <?php echo esc_html( sahand_fa_num( $sahand_total ) ); ?> پروژه
			</p>
			<button type="button" data-filter-reset class="hidden items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold">
				<?php sahand_the_icon( 'rotate', 14 ); ?>
				حذف فیلترها
			</button>
		</div>

		<?php if ( $sahand_archive->have_posts() ) : ?>
			<div data-project-grid class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
				<?php $sahand_i = 0; ?>
				<?php while ( $sahand_archive->have_posts() ) : ?>
					<?php
					$sahand_archive->the_post();
					$sahand_meta = sahand_project_meta( get_the_ID() );
					?>
					<div
						class="reveal"
						data-reveal
						data-delay="<?php echo esc_attr( ( $sahand_i % 3 ) * 70 ); ?>"
						data-project-card
						data-name="<?php echo esc_attr( get_the_title() . ' ' . $sahand_meta['city'] . ' ' . $sahand_meta['state'] . ' ' . $sahand_meta['type'] ); ?>"
						data-location="<?php echo esc_attr( $sahand_meta['city'] ); ?>"
						data-type="<?php echo esc_attr( $sahand_meta['type'] ); ?>"
						data-featured="<?php echo esc_attr( $sahand_meta['featured'] ? '1' : '0' ); ?>"
						data-date="<?php echo esc_attr( get_post_time( 'Y-m-d' ) ); ?>"
					>
						<?php sahand_project_card( get_the_ID() ); ?>
					</div>
					<?php $sahand_i++; ?>
				<?php endwhile; ?>
			</div>

			<div data-empty-state class="mt-16 hidden flex-col items-center py-16 text-center">
				<span class="grid h-16 w-16 place-items-center rounded-full bg-navy/5 text-navy/40">
					<?php sahand_the_icon( 'search', 24 ); ?>
				</span>
				<h2 class="mt-6 text-xl font-bold text-navy">پروژه‌ای با این شرایط پیدا نشد</h2>
				<p class="mt-2 max-w-sm text-sm text-ink/60">فیلترها را بردارید تا پروژه‌های بیشتری ببینید.</p>
				<button type="button" data-filter-reset class="btn-primary mt-8">
					<?php sahand_the_icon( 'rotate', 15 ); ?>
					حذف همه فیلترها
				</button>
			</div>
		<?php else : ?>
			<div class="mt-16 flex flex-col items-center py-16 text-center">
				<p class="text-sm text-ink/60">هنوز پروژه‌ای منتشر نشده است.</p>
			</div>
		<?php endif; ?>
		<?php wp_reset_postdata(); ?>
	</div>
</section>

<?php
get_footer();
