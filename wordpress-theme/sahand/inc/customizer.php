<?php
/**
 * Brand & contact settings in the Customizer.
 *
 * @package Sahand
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'customize_register',
	function ( $wp_customize ) {
		$wp_customize->add_section(
			'sahand_brand',
			array(
				'title'       => 'اطلاعات برند و تماس',
				'priority'    => 30,
				'description' => 'این مقادیر در هدر، فوتر، کارت پروژه‌ها و فرم‌ها استفاده می‌شوند.',
			)
		);

		$fields = array(
			'sahand_name'     => array( 'label' => 'نام برند', 'default' => 'گروه ساختمانی سهند' ),
			'sahand_tagline'  => array( 'label' => 'شعار کوتاه', 'default' => 'ساخت و سرمایه‌گذاری ملکی لوکس در کرج' ),
			'sahand_phone'    => array( 'label' => 'تلفن همراه', 'default' => '۰۹۱۲ ۱۶۴ ۲۱۶۰' ),
			'sahand_office'   => array( 'label' => 'تلفن دفتر', 'default' => '۰۲۶ ۳۳۴۰ ۱۰۲۰' ),
			'sahand_email'    => array( 'label' => 'ایمیل', 'default' => 'info@grohesahand.com' ),
			'sahand_address'  => array( 'label' => 'نشانی', 'default' => 'کرج، مهرشهر، بلوار ارم' ),
			'sahand_address2' => array( 'label' => 'ادامه نشانی', 'default' => 'حدفاصل خیابان ۳۰۹ و ۳۱۱' ),
			'sahand_hours'    => array( 'label' => 'ساعت کاری', 'default' => 'شنبه تا پنجشنبه · ۹ تا ۱۸' ),
		);

		foreach ( $fields as $key => $field ) {
			$wp_customize->add_setting(
				$key,
				array(
					'default'           => $field['default'],
					'sanitize_callback' => 'sahand_email' === $key ? 'sanitize_email' : 'sanitize_text_field',
					'transport'         => 'refresh',
				)
			);
			$wp_customize->add_control(
				$key,
				array(
					'label'   => $field['label'],
					'section' => 'sahand_brand',
					'type'    => 'text',
				)
			);
		}
	}
);
