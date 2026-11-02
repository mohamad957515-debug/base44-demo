<?php
/**
 * Site footer.
 *
 * @package Sahand
 */

$sahand_brand = sahand_brand();
?>
</main>

<footer class="bg-navy-950 text-white">
	<div class="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.9fr_1.1fr_1.3fr] lg:gap-10 lg:py-20">
		<div>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( $sahand_brand['name'] ); ?>" class="flex items-center gap-2.5">
				<svg viewBox="0 0 32 32" fill="currentColor" class="h-8 w-8 shrink-0 text-gold" aria-hidden="true">
					<rect x="6.5" y="13" width="3" height="10" rx="0.6" />
					<rect x="12.2" y="7" width="3" height="16" rx="0.6" />
					<rect x="17.9" y="10.5" width="3" height="12.5" rx="0.6" />
					<rect x="6.5" y="25" width="14.4" height="1.8" rx="0.9" />
				</svg>
				<span class="text-base font-bold leading-[1.2] text-white">
					سهند
					<span class="block text-[10px] font-semibold text-gold">گروه ساختمانی</span>
				</span>
			</a>

			<p class="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
				<?php echo esc_html( $sahand_brand['name'] ); ?>؛ ساخت و سرمایه‌گذاری ملکی لوکس در کرج، مهرشهر
				و البرز. انتخاب موقعیت، طراحی، اجرا و تحویل — شفاف، خوش‌ساخت و
				قابل اعتماد.
			</p>

			<div class="mt-6 flex gap-3">
				<?php foreach ( sahand_socials() as $sahand_social ) : ?>
					<a
						href="<?php echo esc_url( $sahand_social['href'] ); ?>"
						target="_blank"
						rel="noreferrer"
						aria-label="<?php echo esc_attr( $sahand_social['label'] ); ?>"
						class="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-gold hover:text-gold"
					>
						<?php sahand_the_icon( $sahand_social['icon'], 16 ); ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>

		<nav aria-label="فوتر">
			<h4 class="label-gold">دسترسی سریع</h4>
			<ul class="mt-6 space-y-3">
				<?php foreach ( sahand_nav_links() as $sahand_link ) : ?>
					<li>
						<a href="<?php echo esc_url( $sahand_link['url'] ); ?>" class="text-sm text-white/65 transition-colors hover:text-gold">
							<?php echo esc_html( $sahand_link['label'] ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>

		<div>
			<h4 class="label-gold">تماس</h4>
			<ul class="mt-6 space-y-4 text-sm text-white/65">
				<li>
					<a href="<?php echo esc_url( $sahand_brand['phone_href'] ); ?>" class="flex items-start gap-3 transition-colors hover:text-gold">
						<?php sahand_the_icon( 'phone', 15, 'mt-0.5 shrink-0 text-gold' ); ?>
						<span dir="ltr"><?php echo esc_html( $sahand_brand['phone'] ); ?></span>
					</a>
				</li>
				<li>
					<a href="<?php echo esc_url( $sahand_brand['office_href'] ); ?>" class="flex items-start gap-3 transition-colors hover:text-gold">
						<?php sahand_the_icon( 'phone', 15, 'mt-0.5 shrink-0 text-gold' ); ?>
						<span dir="ltr"><?php echo esc_html( $sahand_brand['office'] ); ?></span>
					</a>
				</li>
				<li>
					<a href="<?php echo esc_url( $sahand_brand['email_href'] ); ?>" class="flex items-start gap-3 transition-colors hover:text-gold">
						<?php sahand_the_icon( 'mail', 15, 'mt-0.5 shrink-0 text-gold' ); ?>
						<?php echo esc_html( $sahand_brand['email'] ); ?>
					</a>
				</li>
				<li class="flex items-start gap-3">
					<?php sahand_the_icon( 'map-pin', 15, 'mt-0.5 shrink-0 text-gold' ); ?>
					<span>
						<?php echo esc_html( $sahand_brand['address'] ); ?>
						<br />
						<?php echo esc_html( $sahand_brand['address2'] ); ?>
					</span>
				</li>
			</ul>
		</div>

		<div>
			<h4 class="label-gold">خبرنامه</h4>
			<p class="mt-6 text-sm leading-relaxed text-white/60">
				پروژه‌های جدید و تحلیل بازار ملکی، ماهانه در ایمیل شما.
			</p>

			<div class="mt-5">
				<?php if ( 'sent' === sahand_form_status() ) : ?>
					<p class="flex items-center gap-2 text-sm font-medium text-gold">
						<?php sahand_the_icon( 'check', 16 ); ?>
						ممنون — شما به فهرست خبرنامه پیوستید.
					</p>
				<?php else : ?>
					<form id="newsletter-form" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" class="flex gap-2">
						<input type="hidden" name="action" value="sahand_lead" />
						<input type="hidden" name="sahand_form" value="newsletter" />
						<?php wp_nonce_field( 'sahand_lead', 'sahand_lead_nonce', false ); ?>
						<label for="newsletter-email" class="sr-only">ایمیل</label>
						<input
							id="newsletter-email"
							name="sahand_email"
							type="email"
							required
							placeholder="ایمیل شما"
							class="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
						/>
						<button type="submit" aria-label="عضویت در خبرنامه" class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-navy-950 transition hover:bg-gold-light">
							<?php sahand_the_icon( 'send', 16 ); ?>
						</button>
					</form>
				<?php endif; ?>
			</div>
		</div>
	</div>

	<div class="border-t border-white/10">
		<div class="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
			<p>© <?php echo esc_html( sahand_fa_num( gmdate( 'Y' ) ) ); ?> <?php echo esc_html( $sahand_brand['name'] ); ?> — تمام حقوق محفوظ است.</p>
			<p><?php echo esc_html( $sahand_brand['hours'] ); ?></p>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
