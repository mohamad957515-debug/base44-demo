<?php
/**
 * Single project.
 *
 * @package Sahand
 */

get_header();

$sahand_brand  = sahand_brand();
$sahand_meta   = sahand_project_meta( get_the_ID() );
$sahand_images = sahand_project_images( get_the_ID() );
$sahand_status = sahand_form_status();
$sahand_kind   = isset( $_GET['form'] ) ? sanitize_key( wp_unslash( $_GET['form'] ) ) : '';
?>

<article class="bg-white">
	<div class="container-x pt-28 lg:pt-32">
		<nav aria-label="مسیر صفحه" class="flex items-center gap-1.5 text-xs font-medium text-ink/50">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="transition-colors hover:text-navy">خانه</a>
			<?php sahand_the_icon( 'chevron-left', 12 ); ?>
			<a href="<?php echo esc_url( sahand_projects_url() ); ?>" class="transition-colors hover:text-navy">پروژه‌ها</a>
			<?php sahand_the_icon( 'chevron-left', 12 ); ?>
			<span class="text-navy"><?php the_title(); ?></span>
		</nav>

		<?php if ( 'sent' === $sahand_status && 'consultation' !== $sahand_kind ) : ?>
			<p class="mt-6 rounded-xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm font-medium text-navy">
				درخواست شما ثبت شد — کارشناسان سهند به‌زودی با شما تماس می‌گیرند.
			</p>
		<?php elseif ( 'error' === $sahand_status ) : ?>
			<p class="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
				ارسال درخواست انجام نشد؛ لطفاً نام و شماره تماس را کامل وارد کنید.
			</p>
		<?php endif; ?>

		<div class="mt-8 grid gap-10 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
			<div class="lg:col-span-8">
				<?php if ( $sahand_images ) : ?>
					<div data-gallery>
						<button type="button" data-lightbox-open aria-label="باز کردن نمایشگر تصاویر" class="group relative block w-full overflow-hidden rounded-2xl bg-navy-100">
							<img
								data-gallery-main
								src="<?php echo esc_url( $sahand_images[0] ); ?>"
								alt="<?php echo esc_attr( get_the_title() . ' — تصویر ' . sahand_fa_num( 1 ) . ' از ' . sahand_fa_num( count( $sahand_images ) ) ); ?>"
								class="gallery-img aspect-[16/10] w-full object-cover"
							/>
							<span class="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy backdrop-blur transition-colors group-hover:bg-navy group-hover:text-white">
								<?php sahand_the_icon( 'maximize', 15 ); ?>
							</span>
						</button>

						<div class="mt-3 grid grid-cols-5 gap-3">
							<?php foreach ( $sahand_images as $sahand_i => $sahand_image ) : ?>
								<button
									type="button"
									data-gallery-thumb
									data-src="<?php echo esc_url( $sahand_image ); ?>"
									data-index="<?php echo esc_attr( $sahand_i ); ?>"
									aria-label="<?php echo esc_attr( 'نمایش تصویر ' . sahand_fa_num( $sahand_i + 1 ) ); ?>"
									aria-current="<?php echo 0 === $sahand_i ? 'true' : 'false'; ?>"
									class="overflow-hidden rounded-xl transition <?php echo 0 === $sahand_i ? 'ring-2 ring-gold ring-offset-2' : 'opacity-70 hover:opacity-100'; ?>"
								>
									<img src="<?php echo esc_url( $sahand_image ); ?>" alt="" loading="lazy" class="aspect-[4/3] w-full object-cover" />
								</button>
							<?php endforeach; ?>
						</div>
					</div>

					<div data-lightbox class="anim-fade fixed inset-0 z-[70] hidden items-center justify-center bg-navy-950/95 p-4" role="dialog" aria-modal="true" aria-label="<?php echo esc_attr( 'نمایشگر تصاویر ' . get_the_title() ); ?>">
						<button type="button" data-lightbox-close aria-label="بستن نمایشگر تصاویر" class="absolute end-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
							<?php sahand_the_icon( 'x', 20 ); ?>
						</button>
						<button type="button" data-lightbox-prev aria-label="تصویر قبلی" class="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8">
							<?php sahand_the_icon( 'arrow-right', 20 ); ?>
						</button>
						<img data-lightbox-image src="<?php echo esc_url( $sahand_images[0] ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>" class="anim-zoom max-h-[82vh] max-w-full rounded-lg object-contain" />
						<button type="button" data-lightbox-next aria-label="تصویر بعدی" class="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8">
							<?php sahand_the_icon( 'arrow-left', 20 ); ?>
						</button>
						<p data-lightbox-counter class="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium tracking-widest text-white/70">
							<?php echo esc_html( sahand_fa_num( 1 ) . ' / ' . sahand_fa_num( count( $sahand_images ) ) ); ?>
						</p>
					</div>
				<?php endif; ?>

				<div class="mt-10 flex flex-wrap items-start justify-between gap-6">
					<div>
						<?php if ( $sahand_meta['type'] ) : ?>
							<p class="label-gold"><?php echo esc_html( $sahand_meta['type'] ); ?></p>
						<?php endif; ?>
						<h1 class="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl"><?php the_title(); ?></h1>
						<?php if ( sahand_project_location( get_the_ID() ) ) : ?>
							<p class="mt-3 flex items-center gap-2 text-ink/60">
								<?php sahand_the_icon( 'map-pin', 16, 'text-gold' ); ?>
								<?php echo esc_html( implode( '، ', array_filter( array( $sahand_meta['city'], $sahand_meta['state'], $sahand_meta['country'] ) ) ) ); ?>
							</p>
						<?php endif; ?>
					</div>
					<div class="mt-3 inline-flex items-center gap-2 rounded-full border border-navy/10 px-2 py-1">
						<?php sahand_favorite_button( get_the_ID(), true ); ?>
					</div>
				</div>

				<div id="consultation" class="mt-10 scroll-mt-28 rounded-2xl border border-navy/10 bg-ivory p-6 shadow-card sm:p-8">
					<p class="label-gold">بدون انتشار قیمت</p>
					<h2 class="mt-3 text-2xl font-bold tracking-tight text-navy">ثبت درخواست مشاوره</h2>
					<p class="mt-2 text-sm leading-relaxed text-ink/60">
						برای دریافت شرایط، جزئیات واحدها و زمان‌بندی، شماره تماس خود
						را ثبت کنید؛ کارشناسان سهند با شما تماس می‌گیرند.
					</p>

					<div class="mt-6 grid gap-6 lg:grid-cols-2">
						<?php
						get_template_part(
							'template-parts/consultation-form',
							null,
							array( 'project_id' => get_the_ID() )
						);
						?>
						<div class="flex flex-col justify-center rounded-xl bg-navy p-6 text-white">
							<p class="text-xs font-semibold text-gold">تماس مستقیم</p>
							<a href="<?php echo esc_url( $sahand_brand['phone_href'] ); ?>" class="mt-2 flex items-center gap-2 text-xl font-bold transition-colors hover:text-gold-light">
								<?php sahand_the_icon( 'phone', 17, 'text-gold' ); ?>
								<span dir="ltr"><?php echo esc_html( $sahand_brand['phone'] ); ?></span>
							</a>
							<a href="<?php echo esc_url( $sahand_brand['office_href'] ); ?>" class="mt-2 flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white">
								<?php sahand_the_icon( 'phone', 14, 'text-gold' ); ?>
								<span dir="ltr"><?php echo esc_html( $sahand_brand['office'] ); ?></span>
							</a>
							<p class="mt-5 text-xs leading-relaxed text-white/50"><?php echo esc_html( $sahand_brand['hours'] ); ?></p>
						</div>
					</div>
				</div>
			</div>

			<aside class="lg:col-span-4">
				<div class="lg:sticky lg:top-24">
					<div class="rounded-2xl border border-navy/10 bg-white p-6 shadow-card lg:p-7">
						<div class="flex items-center gap-4">
							<span class="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-gold">
								<?php sahand_the_icon( 'phone', 20 ); ?>
							</span>
							<div>
								<p class="font-bold text-navy"><?php echo esc_html( $sahand_brand['name'] ); ?></p>
								<p class="text-xs font-medium text-gold">مشاوره خرید، پیش‌خرید و مشارکت</p>
								<a href="<?php echo esc_url( $sahand_brand['phone_href'] ); ?>" class="mt-1 flex items-center gap-1.5 text-xs text-ink/60 transition-colors hover:text-navy">
									<?php sahand_the_icon( 'phone', 11 ); ?>
									<span dir="ltr"><?php echo esc_html( $sahand_brand['phone'] ); ?></span>
								</a>
							</div>
						</div>
						<div class="mt-6 space-y-3">
							<a href="#consultation" data-scroll-to-consultation class="btn-primary w-full">ثبت درخواست مشاوره</a>
							<button type="button" data-viewing-open class="btn-outline w-full">
								<?php sahand_the_icon( 'calendar-days', 15 ); ?>
								رزرو بازدید
							</button>
						</div>
						<p class="mt-5 text-center text-xs text-ink/40">پاسخ در یک روز کاری</p>
					</div>
				</div>
			</aside>
		</div>
	</div>

	<?php
	$sahand_related = sahand_related_projects( get_the_ID() );
	if ( $sahand_related->have_posts() ) :
		?>
		<section class="bg-ivory py-16 lg:py-24">
			<div class="container-x">
				<div class="reveal" data-reveal>
					<h2 class="text-2xl font-bold tracking-tight text-navy sm:text-3xl">پروژه‌های مشابه</h2>
				</div>
				<div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
					<?php $sahand_i = 0; ?>
					<?php while ( $sahand_related->have_posts() ) : ?>
						<?php $sahand_related->the_post(); ?>
						<div class="reveal" data-reveal data-delay="<?php echo esc_attr( $sahand_i * 70 ); ?>">
							<?php sahand_project_card( get_the_ID() ); ?>
						</div>
						<?php $sahand_i++; ?>
					<?php endwhile; ?>
				</div>
				<div class="mt-12 text-center">
					<a href="<?php echo esc_url( sahand_projects_url() ); ?>" class="btn-outline">
						<?php sahand_the_icon( 'arrow-right', 15 ); ?>
						مرور همه پروژه‌ها
					</a>
				</div>
			</div>
		</section>
		<?php
		wp_reset_postdata();
	endif;
	?>

	<div class="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-navy/10 bg-white/95 px-5 py-3.5 backdrop-blur-md lg:hidden">
		<a href="<?php echo esc_url( $sahand_brand['phone_href'] ); ?>" class="flex items-center gap-2 text-sm font-bold text-navy">
			<?php sahand_the_icon( 'phone', 16, 'text-gold' ); ?>
			<span dir="ltr"><?php echo esc_html( $sahand_brand['phone'] ); ?></span>
		</a>
		<a href="#consultation" data-scroll-to-consultation class="btn-primary px-5 py-3">
			درخواست مشاوره
			<?php sahand_the_icon( 'arrow-left', 15 ); ?>
		</a>
	</div>
	<div class="h-[76px] lg:hidden" aria-hidden="true"></div>

	<div data-viewing-modal class="anim-fade fixed inset-0 z-[60] hidden items-end justify-center bg-navy-950/60 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="رزرو بازدید">
		<div class="anim-zoom max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl sm:p-8">
			<div class="flex items-start justify-between gap-6">
				<h3 class="text-xl font-bold tracking-tight text-navy">رزرو بازدید</h3>
				<button type="button" data-viewing-close aria-label="بستن پنجره" class="grid h-9 w-9 shrink-0 place-items-center rounded-full text-navy/60 transition-colors hover:bg-navy/5 hover:text-navy">
					<?php sahand_the_icon( 'x', 18 ); ?>
				</button>
			</div>
			<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" class="mt-5 space-y-4">
				<input type="hidden" name="action" value="sahand_lead" />
				<input type="hidden" name="sahand_form" value="viewing" />
				<input type="hidden" name="sahand_project_id" value="<?php echo esc_attr( get_the_ID() ); ?>" />
				<?php wp_nonce_field( 'sahand_lead', 'sahand_lead_nonce' ); ?>

				<div>
					<label for="viewing-name" class="sr-only">نام و نام خانوادگی</label>
					<input id="viewing-name" name="sahand_name" required placeholder="نام و نام خانوادگی" class="field" />
				</div>
				<div>
					<label for="viewing-phone" class="sr-only">شماره تماس</label>
					<input id="viewing-phone" name="sahand_phone" type="tel" inputmode="tel" required placeholder="شماره تماس" class="field" />
				</div>
				<div class="grid grid-cols-2 gap-3">
					<div>
						<label for="viewing-date" class="sr-only">تاریخ ترجیحی</label>
						<input id="viewing-date" name="sahand_visit_date" type="date" required class="field" />
					</div>
					<div>
						<label for="viewing-time" class="sr-only">ساعت ترجیحی</label>
						<select id="viewing-time" name="sahand_visit_time" class="field cursor-pointer">
							<option>۱۰:۰۰</option>
							<option>۱۲:۰۰</option>
							<option>۱۴:۰۰</option>
							<option>۱۶:۰۰</option>
							<option>۱۸:۰۰</option>
						</select>
					</div>
				</div>
				<button type="submit" class="btn-primary w-full">
					<?php sahand_the_icon( 'calendar', 15 ); ?>
					درخواست بازدید
				</button>
			</form>
		</div>
	</div>
</article>

<?php
get_footer();
