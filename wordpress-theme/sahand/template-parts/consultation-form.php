<?php
/**
 * Consultation request form (replaces the published price).
 *
 * @package Sahand
 */

$sahand_project_id = isset( $args['project_id'] ) ? (int) $args['project_id'] : 0;
$sahand_status     = sahand_form_status();
$sahand_kind       = isset( $_GET['form'] ) ? sanitize_key( wp_unslash( $_GET['form'] ) ) : '';
$sahand_project    = $sahand_project_id ? get_the_title( $sahand_project_id ) : '';

if ( 'sent' === $sahand_status && 'consultation' === $sahand_kind ) :
	?>
	<div class="py-6 text-center">
		<span class="mx-auto block w-fit text-gold"><?php sahand_the_icon( 'check-circle', 40 ); ?></span>
		<h3 class="mt-4 text-lg font-bold text-navy">درخواست شما ثبت شد</h3>
		<p class="mt-2 text-sm leading-relaxed text-ink/60">
			کارشناسان سهند برای مشاوره<?php echo $sahand_project ? esc_html( ' درباره «' . $sahand_project . '»' ) : ''; ?>
			با شما تماس می‌گیرند.
		</p>
		<a href="<?php echo esc_url( remove_query_arg( array( 'sent', 'form' ) ) ); ?>" class="btn-outline mt-6">ثبت درخواست دیگر</a>
	</div>
	<?php
else :
	?>
	<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" class="space-y-4">
		<input type="hidden" name="action" value="sahand_lead" />
		<input type="hidden" name="sahand_form" value="consultation" />
		<?php if ( $sahand_project_id ) : ?>
			<input type="hidden" name="sahand_project_id" value="<?php echo esc_attr( $sahand_project_id ); ?>" />
		<?php endif; ?>
		<?php wp_nonce_field( 'sahand_lead', 'sahand_lead_nonce' ); ?>

		<div>
			<label for="consult-name" class="mb-2 block text-sm font-semibold text-navy">نام و نام خانوادگی</label>
			<input id="consult-name" name="sahand_name" required placeholder="نام شما" class="field" />
		</div>
		<div>
			<label for="consult-phone" class="mb-2 block text-sm font-semibold text-navy">شماره تماس</label>
			<input id="consult-phone" name="sahand_phone" type="tel" inputmode="tel" required placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" class="field" />
		</div>
		<div>
			<label for="consult-note" class="mb-2 block text-sm font-semibold text-navy">توضیح کوتاه (اختیاری)</label>
			<textarea id="consult-note" name="sahand_message" rows="3" placeholder="کمی درباره نیاز خود بنویسید…" class="field resize-none"></textarea>
		</div>
		<button type="submit" class="btn-primary w-full">
			<?php sahand_the_icon( 'send', 15 ); ?>
			ثبت درخواست مشاوره
		</button>
	</form>
	<?php
endif;
