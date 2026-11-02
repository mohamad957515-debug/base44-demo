<?php
/**
 * Brand constants and static section copy (same text as the React site).
 *
 * @package Sahand
 */

defined( 'ABSPATH' ) || exit;

/** Converts Latin digits to Persian digits. */
function sahand_fa_num( $value ) {
	$latin   = array( '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' );
	$persian = array( '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' );
	return str_replace( $latin, $persian, (string) $value );
}

/** Builds a `tel:` link from a display phone number (Persian or Latin digits). */
function sahand_tel_href( $value ) {
	$latin = str_replace(
		array( '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' ),
		array( '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ),
		(string) $value
	);
	$digits = preg_replace( '/[^0-9+]/', '', $latin );
	if ( '' === $digits ) {
		return '';
	}
	if ( 0 === strpos( $digits, '00' ) ) {
		$digits = '+' . substr( $digits, 2 );
	} elseif ( 0 === strpos( $digits, '0' ) ) {
		$digits = '+98' . substr( $digits, 1 );
	}
	return 'tel:' . $digits;
}

/** Brand & contact details (editable in Appearance → Customize). */
function sahand_brand() {
	$defaults = array(
		'name'        => 'گروه ساختمانی سهند',
		'phone'       => '۰۹۱۲ ۱۶۴ ۲۱۶۰',
		'office'      => '۰۲۶ ۳۳۴۰ ۱۰۲۰',
		'email'       => 'info@grohesahand.com',
		'address'     => 'کرج، مهرشهر، بلوار ارم',
		'address2'    => 'حدفاصل خیابان ۳۰۹ و ۳۱۱',
		'hours'       => 'شنبه تا پنجشنبه · ۹ تا ۱۸',
		'tagline'     => 'ساخت و سرمایه‌گذاری ملکی لوکس در کرج',
	);

	$brand = array(
		'name'     => get_theme_mod( 'sahand_name', $defaults['name'] ),
		'phone'    => get_theme_mod( 'sahand_phone', $defaults['phone'] ),
		'office'   => get_theme_mod( 'sahand_office', $defaults['office'] ),
		'email'    => get_theme_mod( 'sahand_email', $defaults['email'] ),
		'address'  => get_theme_mod( 'sahand_address', $defaults['address'] ),
		'address2' => get_theme_mod( 'sahand_address2', $defaults['address2'] ),
		'hours'    => get_theme_mod( 'sahand_hours', $defaults['hours'] ),
		'tagline'  => get_theme_mod( 'sahand_tagline', $defaults['tagline'] ),
	);

	$brand['phone_href']  = sahand_tel_href( $brand['phone'] );
	$brand['office_href'] = sahand_tel_href( $brand['office'] );
	$brand['email_href']  = 'mailto:' . $brand['email'];

	return $brand;
}

/** Projects archive URL. */
function sahand_projects_url() {
	$link = get_post_type_archive_link( 'project' );
	return $link ? $link : home_url( '/projects/' );
}

/** Contact page URL (created on activation). */
function sahand_contact_url() {
	$page = get_page_by_path( 'contact' );
	return $page ? get_permalink( $page ) : home_url( '/contact/' );
}

/** Primary navigation — falls back to these links when no WP menu is assigned. */
function sahand_nav_links() {
	return array(
		array( 'label' => 'خانه', 'url' => home_url( '/' ), 'kind' => 'route' ),
		array( 'label' => 'پروژه‌ها', 'url' => sahand_projects_url(), 'kind' => 'route' ),
		array( 'label' => 'درباره ما', 'url' => home_url( '/#about' ), 'kind' => 'section' ),
		array( 'label' => 'خدمات', 'url' => home_url( '/#services' ), 'kind' => 'section' ),
		array( 'label' => 'روند همکاری', 'url' => home_url( '/#process' ), 'kind' => 'section' ),
		array( 'label' => 'تماس', 'url' => sahand_contact_url(), 'kind' => 'route' ),
	);
}

function sahand_socials() {
	return array(
		array( 'label' => 'فیسبوک', 'href' => 'https://www.facebook.com', 'icon' => 'facebook' ),
		array( 'label' => 'اینستاگرام', 'href' => 'https://www.instagram.com', 'icon' => 'instagram' ),
		array( 'label' => 'لینکدین', 'href' => 'https://www.linkedin.com', 'icon' => 'linkedin' ),
		array( 'label' => 'ایکس', 'href' => 'https://www.x.com', 'icon' => 'twitter' ),
	);
}

function sahand_services() {
	return array(
		array(
			'number' => '۰۱',
			'title'  => 'خرید و پیش‌خرید واحد لوکس',
			'text'   => 'معرفی پروژه‌های شاخص، موقعیت، کیفیت ساخت و امکان بازدید حضوری برای خریداران جدی.',
		),
		array(
			'number' => '۰۲',
			'title'  => 'سرمایه‌گذاری ملکی در کرج',
			'text'   => 'تمرکز روی فرصت‌های کم‌ریسک‌تر، رشد ارزش منطقه و انتخاب پروژه‌های در حال توسعه.',
		),
		array(
			'number' => '۰۳',
			'title'  => 'مشارکت در ساخت',
			'text'   => 'برای مالکان زمین و ساختمان‌های کلنگی که به دنبال سازنده‌ای خوش‌نام، دقیق و متعهد هستند.',
		),
		array(
			'number' => '۰۴',
			'title'  => 'طراحی و اجرا',
			'text'   => 'نگاه همزمان به معماری، کیفیت ساخت، متریال و فروش‌پذیری نهایی پروژه.',
		),
		array(
			'number' => '۰۵',
			'title'  => 'بازدید و ارزیابی ملک',
			'text'   => 'بررسی موقعیت، ظرفیت ساخت و ارزش آینده ملک؛ همراه با امکان بازدید حضوری از پروژه‌ها.',
		),
		array(
			'number' => '۰۶',
			'title'  => 'مشاوره اختصاصی',
			'text'   => 'مسیر شفاف از اولین تماس تا تصمیم نهایی — مشاوره، برآورد ظرفیت و پیشنهاد اجرایی قابل تصمیم.',
		),
	);
}

function sahand_process() {
	return array(
		array(
			'number' => '۰۱',
			'title'  => 'انتخاب مسیر',
			'text'   => 'خرید، پیش‌خرید، سرمایه‌گذاری یا مشارکت در ساخت — مسیر مناسب شما مشخص می‌شود.',
		),
		array(
			'number' => '۰۲',
			'title'  => 'مشاوره اولیه',
			'text'   => 'ثبت درخواست و تماس سریع کارشناس سهند برای شناخت دقیق نیاز شما.',
		),
		array(
			'number' => '۰۳',
			'title'  => 'بازدید یا ارزیابی',
			'text'   => 'بررسی پروژه، زمین یا هدف سرمایه‌گذاری؛ با امکان بازدید حضوری.',
		),
		array(
			'number' => '۰۴',
			'title'  => 'پیشنهاد اختصاصی',
			'text'   => 'ارائه مسیر شفاف و قابل تصمیم برای رسیدن به انتخاب نهایی.',
		),
	);
}

function sahand_why_points() {
	return array(
		'طراحی و اجرای خوش‌ساخت با متریال و جزئیات سطح یک',
		'شناخت موقعیت‌های ارزشمند کرج، مهرشهر و البرز',
		'مسیر شفاف از بررسی موقعیت تا پیشنهاد اجرایی',
		'همراهی از انتخاب مسیر تا تحویل نهایی',
	);
}

function sahand_stats() {
	return array(
		array( 'value' => 'کرج و البرز', 'label' => 'تمرکز پروژه‌ها' ),
		array( 'value' => '۳ مسیر', 'label' => 'خرید، سرمایه‌گذاری، مشارکت' ),
		array( 'value' => 'مهرشهر', 'label' => 'مقر دفتر و تمرکز ساخت' ),
		array( 'value' => 'شفاف', 'label' => 'مسیر تصمیم‌گیری' ),
	);
}

function sahand_about_photos() {
	return array(
		'primary'   => 'https://grohesahand.com/wp-content/uploads/2015/10/modern-home-1500x1000.jpg',
		'secondary' => 'https://grohesahand.com/wp-content/uploads/2025/02/p_ladan-5.jpg',
	);
}

function sahand_consultation_subjects() {
	return array( 'خرید', 'پیش‌خرید', 'سرمایه‌گذاری', 'مشارکت در ساخت', 'درخواست بازدید', 'سایر' );
}
