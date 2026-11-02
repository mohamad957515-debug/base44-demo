<?php
/**
 * Consultation / contact requests: handle, store and notify.
 *
 * @package Sahand
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_post_nopriv_sahand_lead', 'sahand_handle_lead' );
add_action( 'admin_post_sahand_lead', 'sahand_handle_lead' );

/** Returns 'sent', 'error' or '' for the current request. */
function sahand_form_status() {
	if ( ! isset( $_GET['sent'] ) ) {
		return '';
	}
	return '1' === (string) wp_unslash( $_GET['sent'] ) ? 'sent' : 'error';
}

/** Stores the request as a private entry and emails the site admin. */
function sahand_handle_lead() {
	$redirect = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	$redirect = remove_query_arg( array( 'sent' ), $redirect );
	$redirect = strtok( $redirect, '#' );

	$nonce = isset( $_POST['sahand_lead_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['sahand_lead_nonce'] ) ) : '';
	if ( ! wp_verify_nonce( $nonce, 'sahand_lead' ) ) {
		wp_safe_redirect( add_query_arg( 'sent', '0', $redirect ) );
		exit;
	}

	$name       = isset( $_POST['sahand_name'] ) ? sanitize_text_field( wp_unslash( $_POST['sahand_name'] ) ) : '';
	$phone      = isset( $_POST['sahand_phone'] ) ? sanitize_text_field( wp_unslash( $_POST['sahand_phone'] ) ) : '';
	$email      = isset( $_POST['sahand_email'] ) ? sanitize_email( wp_unslash( $_POST['sahand_email'] ) ) : '';
	$subject    = isset( $_POST['sahand_subject'] ) ? sanitize_text_field( wp_unslash( $_POST['sahand_subject'] ) ) : '';
	$message    = isset( $_POST['sahand_message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['sahand_message'] ) ) : '';
	$project_id = isset( $_POST['sahand_project_id'] ) ? absint( $_POST['sahand_project_id'] ) : 0;
	$visit_date = isset( $_POST['sahand_visit_date'] ) ? sanitize_text_field( wp_unslash( $_POST['sahand_visit_date'] ) ) : '';
	$visit_time = isset( $_POST['sahand_visit_time'] ) ? sanitize_text_field( wp_unslash( $_POST['sahand_visit_time'] ) ) : '';
	$form       = isset( $_POST['sahand_form'] ) ? sanitize_key( wp_unslash( $_POST['sahand_form'] ) ) : 'consultation';

	$anchor = $project_id ? '#consultation' : '#contact';

	if ( '' === $name || ( '' === $phone && '' === $email ) ) {
		wp_safe_redirect( add_query_arg( 'sent', '0', $redirect ) . $anchor );
		exit;
	}

	$labels = array(
		'consultation' => 'درخواست مشاوره',
		'contact'      => 'پیام از فرم تماس',
		'viewing'      => 'درخواست بازدید',
	);
	$label = isset( $labels[ $form ] ) ? $labels[ $form ] : $labels['consultation'];

	$project_title = $project_id ? get_the_title( $project_id ) : '';
	$title         = $name . ' — ' . $label;

	$body = "درخواست جدید از سایت:\n\n";
	$body .= 'نوع: ' . $label . "\n";
	$body .= 'نام: ' . $name . "\n";
	if ( $phone ) {
		$body .= 'تلفن: ' . $phone . "\n";
	}
	if ( $email ) {
		$body .= 'ایمیل: ' . $email . "\n";
	}
	if ( $project_title ) {
		$body .= 'پروژه: ' . $project_title . "\n";
	}
	if ( $subject ) {
		$body .= 'موضوع: ' . $subject . "\n";
	}
	if ( $visit_date ) {
		$body .= 'تاریخ بازدید: ' . $visit_date . ' ' . $visit_time . "\n";
	}
	if ( $message ) {
		$body .= "\nپیام:\n" . $message . "\n";
	}

	$lead_id = wp_insert_post(
		array(
			'post_type'    => 'sahand_lead',
			'post_status'  => 'private',
			'post_title'   => $title,
			'post_content' => $body,
		)
	);

	if ( $lead_id && ! is_wp_error( $lead_id ) ) {
		update_post_meta( $lead_id, '_sahand_name', $name );
		update_post_meta( $lead_id, '_sahand_phone', $phone );
		update_post_meta( $lead_id, '_sahand_email', $email );
		update_post_meta( $lead_id, '_sahand_project', $project_title );
	}

	wp_mail(
		get_option( 'admin_email' ),
		'[' . get_bloginfo( 'name' ) . '] ' . $label . ' — ' . $name,
		$body
	);

	wp_safe_redirect( add_query_arg( 'sent', '1', $redirect ) . $anchor );
	exit;
}
