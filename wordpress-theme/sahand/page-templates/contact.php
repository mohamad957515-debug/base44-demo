<?php
/**
 * Template Name: تماس با ما
 *
 * @package Sahand
 */

get_header();

$sahand_brand  = sahand_brand();
$sahand_status = sahand_form_status();
$sahand_kind   = isset( $_GET['form'] ) ? sanitize_key( wp_unslash( $_GET['form'] ) ) : '';

$sahand_info = array(
	array( 'icon' => 'phone', 'label' => 'تماس مستقیم', 'value' => $sahand_brand['phone'], 'href' => $sahand_brand['phone_href'], 'ltr' => true ),
	array( 'icon' => 'phone', 'label' => 'تلفن دفتر', 'value' => $sahand_brand['office'], 'href' => $sahand_brand['office_href'], 'ltr' => true ),
	array( 'icon' => 'mail', 'label' => 'ایمیل', 'value' => $sahand_brand['email'], 'href' => $sahand_brand['email_href'], 'ltr' => true ),
	array( 'icon' => 'map-pin', 'label' => 'نشانی دفتر', 'value' => $sahand_brand['address'] . '، ' . $sahand_brand['address2'], 'href' => '', 'ltr' => false ),
	array( 'icon' => 'clock', 'label' => 'ساعت کاری', 'value' => $sahand_brand['hours'], 'href' => '', 'ltr' => false ),
);
?>

<section class="relative overflow-hidden bg-navy-950 pb-16 pt-32 lg:pb-20 lg:pt-40">
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgba(21,52,87,0.9),transparent)]"></div>
	<div class="container-x relative text-center">
		<p class="label-gold">تماس</p>
		<h1 class="mx-auto mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
			برای یک تصمیم بزرگ، گفت‌وگویی دقیق شروع کنید
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-white/60">
			برای خرید، پیش‌خرید، سرمایه‌گذاری ملکی یا مشارکت در ساخت با تیم
			سهند در ارتباط باشید.
		</p>
	</div>
</section>

<section class="bg-ivory py-14 lg:py-24">
	<div class="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
		<div class="space-y-4 lg:col-span-5">
			<?php foreach ( $sahand_info as $sahand_i => $sahand_item ) : ?>
				<div class="reveal" data-reveal data-delay="<?php echo esc_attr( $sahand_i * 60 ); ?>">
					<div class="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-card">
						<span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-gold">
							<?php sahand_the_icon( $sahand_item['icon'], 19 ); ?>
						</span>
						<div>
							<p class="text-xs font-bold text-ink/40"><?php echo esc_html( $sahand_item['label'] ); ?></p>
							<?php if ( $sahand_item['href'] ) : ?>
								<a href="<?php echo esc_url( $sahand_item['href'] ); ?>" class="mt-1 block font-semibold text-navy transition-colors hover:text-gold">
									<?php if ( $sahand_item['ltr'] ) : ?>
										<span dir="ltr"><?php echo esc_html( $sahand_item['value'] ); ?></span>
									<?php else : ?>
										<?php echo esc_html( $sahand_item['value'] ); ?>
									<?php endif; ?>
								</a>
							<?php else : ?>
								<p class="mt-1 font-semibold text-navy"><?php echo esc_html( $sahand_item['value'] ); ?></p>
							<?php endif; ?>
						</div>
					</div>
				</div>
			<?php endforeach; ?>

			<div class="reveal" data-reveal data-delay="320">
				<div class="rounded-2xl bg-navy p-7 text-white shadow-card">
					<p class="label-gold">مشاوره اختصاصی</p>
					<p class="mt-3 text-sm leading-relaxed text-white/70">
						هر درخواست توسط کارشناسان سهند بررسی می‌شود — بدون مرکز
						تماس، بدون واسطه. برای تصمیم‌های ملکی بزرگ، گفت‌وگویی دقیق
						شروع کنید.
					</p>
					<a href="<?php echo esc_url( $sahand_brand['phone_href'] ); ?>" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light">
						<?php sahand_the_icon( 'phone', 14 ); ?>
						<span dir="ltr"><?php echo esc_html( $sahand_brand['phone'] ); ?></span>
					</a>
				</div>
			</div>
		</div>

		<div class="reveal lg:col-span-7" data-reveal data-delay="120">
			<div id="contact" class="rounded-2xl bg-white p-6 shadow-card sm:p-10">
				<h2 class="text-2xl font-bold tracking-tight text-navy">درخواست مشاوره</h2>
				<p class="mt-2 text-sm text-ink/60">ظرف یک روز کاری پاسخ می‌دهیم.</p>

				<div class="mt-8">
					<?php if ( 'sent' === $sahand_status && 'contact' === $sahand_kind ) : ?>
						<div class="flex flex-col items-center py-14 text-center">
							<span class="text-gold"><?php sahand_the_icon( 'check-circle', 48 ); ?></span>
							<h3 class="mt-5 text-xl font-bold text-navy">درخواست شما ثبت شد</h3>
							<p class="mt-2 max-w-sm text-sm text-ink/60">
								ممنون که با سهند در تماس هستید — کارشناسان ما ظرف یک روز کاری
								پاسخ‌تان را می‌دهند.
							</p>
							<a href="<?php echo esc_url( remove_query_arg( array( 'sent', 'form' ) ) ); ?>" class="btn-outline mt-7">ارسال درخواست دیگر</a>
						</div>
					<?php else : ?>
						<?php if ( 'error' === $sahand_status ) : ?>
							<p class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
								ارسال درخواست انجام نشد؛ لطفاً نام و راه تماس را کامل وارد کنید.
							</p>
						<?php endif; ?>

						<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" class="space-y-5">
							<input type="hidden" name="action" value="sahand_lead" />
							<input type="hidden" name="sahand_form" value="contact" />
							<?php wp_nonce_field( 'sahand_lead', 'sahand_lead_nonce' ); ?>

							<div class="grid gap-5 sm:grid-cols-2">
								<div>
									<label for="c-name" class="mb-2 block text-sm font-semibold text-navy">نام و نام خانوادگی</label>
									<input id="c-name" name="sahand_name" required placeholder="سارا محمدی" class="field" />
								</div>
								<div>
									<label for="c-email" class="mb-2 block text-sm font-semibold text-navy">ایمیل</label>
									<input id="c-email" name="sahand_email" type="email" required placeholder="sara@example.com" class="field" dir="ltr" />
								</div>
							</div>
							<div class="grid gap-5 sm:grid-cols-2">
								<div>
									<label for="c-phone" class="mb-2 block text-sm font-semibold text-navy">شماره تماس (اختیاری)</label>
									<input id="c-phone" name="sahand_phone" type="tel" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" class="field" />
								</div>
								<div>
									<label for="c-subject" class="mb-2 block text-sm font-semibold text-navy">نوع درخواست</label>
									<select id="c-subject" name="sahand_subject" class="field cursor-pointer">
										<?php foreach ( sahand_consultation_subjects() as $sahand_subject ) : ?>
											<option><?php echo esc_html( $sahand_subject ); ?></option>
										<?php endforeach; ?>
									</select>
								</div>
							</div>
							<div>
								<label for="c-message" class="mb-2 block text-sm font-semibold text-navy">توضیحات کوتاه</label>
								<textarea id="c-message" name="sahand_message" rows="5" required placeholder="کمی درباره نیاز یا هدف ملکی خود بنویسید…" class="field resize-none"></textarea>
							</div>
							<button type="submit" class="btn-primary w-full sm:w-auto">
								<?php sahand_the_icon( 'send', 15 ); ?>
								ارسال درخواست
							</button>
						</form>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
