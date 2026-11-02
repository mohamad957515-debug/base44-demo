<?php
/**
 * Theme setup, menus and asset loading.
 *
 * @package Sahand
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		load_theme_textdomain( 'sahand', get_template_directory() . '/languages' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'html5', array( 'style', 'script', 'navigation-widgets', 'search-form' ) );

		register_nav_menus(
			array(
				'primary' => 'منوی اصلی',
				'footer'  => 'منوی فوتر',
			)
		);
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		$dir = get_template_directory();
		$uri = get_template_directory_uri();

		wp_enqueue_style(
			'sahand-theme',
			$uri . '/assets/css/theme.css',
			array(),
			file_exists( $dir . '/assets/css/theme.css' ) ? filemtime( $dir . '/assets/css/theme.css' ) : SAHAND_VERSION
		);

		wp_enqueue_script(
			'sahand-theme',
			$uri . '/assets/js/theme.js',
			array(),
			file_exists( $dir . '/assets/js/theme.js' ) ? filemtime( $dir . '/assets/js/theme.js' ) : SAHAND_VERSION,
			true
		);
	}
);

/** Admin styles/scripts for the project meta box. */
add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		if ( 'post.php' !== $hook && 'post-new.php' !== $hook ) {
			return;
		}
		$screen = get_current_screen();
		if ( ! $screen || 'project' !== $screen->post_type ) {
			return;
		}
		wp_enqueue_media();
		wp_enqueue_script(
			'sahand-admin',
			get_template_directory_uri() . '/assets/js/admin.js',
			array( 'jquery' ),
			SAHAND_VERSION,
			true
		);
	}
);

/** Adds a small helper class to the body for the sticky header. */
add_filter(
	'body_class',
	function ( $classes ) {
		$classes[] = 'bg-white font-sans text-ink antialiased';
		return $classes;
	}
);

/** Persian digits inside `the_title()` and archive counters are handled in templates. */
add_filter( 'excerpt_more', '__return_empty_string' );
