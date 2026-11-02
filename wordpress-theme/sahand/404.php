<?php
/**
 * 404 template.
 *
 * @package Sahand
 */

get_header();
?>

<section class="bg-white pb-24 pt-40 text-center lg:pb-32">
	<div class="container-x">
		<p class="label-gold">خطای ۴۰۴</p>
		<h1 class="mt-4 text-4xl font-bold tracking-tight text-navy sm:text-5xl">این صفحه پیدا نشد</h1>
		<p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60">
			ممکن است نشانی تغییر کرده باشد. از صفحه اصلی یا فهرست پروژه‌ها ادامه دهید.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary">بازگشت به خانه</a>
			<a href="<?php echo esc_url( sahand_projects_url() ); ?>" class="btn-outline">مشاهده پروژه‌ها</a>
		</div>
	</div>
</section>

<?php
get_footer();
