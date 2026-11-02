<?php
/**
 * Seeds the three Sahand projects and the contact page on activation so the
 * site looks complete right after installing the theme.
 *
 * @package Sahand
 */

defined( 'ABSPATH' ) || exit;

add_action( 'after_switch_theme', 'sahand_seed_demo_content' );

function sahand_seed_demo_content() {
	// Static home page so front-page.php renders the full design.
	if ( ! get_option( 'page_on_front' ) ) {
		$home_page = get_page_by_path( 'home' );
		$home_id   = $home_page ? $home_page->ID : wp_insert_post(
			array(
				'post_type'   => 'page',
				'post_title'  => 'خانه',
				'post_name'   => 'home',
				'post_status' => 'publish',
			)
		);
		if ( $home_id && ! is_wp_error( $home_id ) ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $home_id );
		}
	}

	// Contact page using the contact template.
	if ( ! get_page_by_path( 'contact' ) ) {
		$page_id = wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_title'   => 'تماس با ما',
				'post_name'    => 'contact',
				'post_status'  => 'publish',
				'post_content' => '',
			)
		);
		if ( $page_id && ! is_wp_error( $page_id ) ) {
			update_post_meta( $page_id, '_wp_page_template', 'page-templates/contact.php' );
		}
	}

	$existing = get_posts(
		array(
			'post_type'   => 'project',
			'numberposts' => 1,
			'post_status' => 'any',
			'fields'      => 'ids',
		)
	);

	if ( empty( $existing ) ) {
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		$seed = array(
			array(
				'title'    => 'پروژه لادن',
				'type'     => 'آپارتمان لوکس',
				'city'     => 'خیابان بوستان',
				'state'    => 'کرج',
				'new'      => true,
				'date'     => '2026-09-12 10:00:00',
				'images'   => array(
					'https://grohesahand.com/wp-content/uploads/2025/02/p_ladan-1.jpg',
					'https://grohesahand.com/wp-content/uploads/2025/02/p_ladan-5.jpg',
					'https://grohesahand.com/wp-content/uploads/2025/02/p_ladan-6.jpg',
				),
			),
			array(
				'title'  => 'پروژه بلوار آزادی',
				'type'   => 'آپارتمان',
				'city'   => 'بلوار آزادی',
				'state'  => 'کرج',
				'new'    => false,
				'date'   => '2026-08-20 10:00:00',
				'images' => array(
					'https://grohesahand.com/wp-content/uploads/2025/02/p_faree-3.jpg',
					'https://grohesahand.com/wp-content/uploads/2025/02/p_faree-4.jpg',
					'https://grohesahand.com/wp-content/uploads/2025/02/p_faree-5.jpg',
				),
			),
			array(
				'title'  => 'پروژه مهرشهر',
				'type'   => 'آپارتمان',
				'city'   => 'مهرشهر',
				'state'  => 'کرج',
				'new'    => true,
				'date'   => '2026-09-28 10:00:00',
				'images' => array( 'https://grohesahand.com/wp-content/uploads/2025/08/sahand_post_mehrshahr_01.jpg' ),
			),
		);

		foreach ( $seed as $item ) {
			$project_id = wp_insert_post(
				array(
					'post_type'   => 'project',
					'post_status' => 'publish',
					'post_title'  => $item['title'],
					'post_date'   => $item['date'],
				)
			);
			if ( ! $project_id || is_wp_error( $project_id ) ) {
				continue;
			}

			update_post_meta( $project_id, '_sahand_type', $item['type'] );
			update_post_meta( $project_id, '_sahand_city', $item['city'] );
			update_post_meta( $project_id, '_sahand_state', $item['state'] );
			update_post_meta( $project_id, '_sahand_country', 'ایران' );
			update_post_meta( $project_id, '_sahand_featured', '1' );
			update_post_meta( $project_id, '_sahand_new', $item['new'] ? '1' : '0' );
			// Remote photo URLs — used when the server cannot import them on activation.
			update_post_meta( $project_id, '_sahand_images', implode( ',', $item['images'] ) );

			$attachment_ids = array();
			foreach ( $item['images'] as $url ) {
				$attachment_id = media_sideload_image( $url, $project_id, $item['title'], 'id' );
				if ( ! is_wp_error( $attachment_id ) ) {
					$attachment_ids[] = (int) $attachment_id;
				}
			}

			if ( $attachment_ids ) {
				set_post_thumbnail( $project_id, $attachment_ids[0] );
				update_post_meta( $project_id, '_sahand_gallery', implode( ',', array_slice( $attachment_ids, 1 ) ) );
			}
		}
	}

	flush_rewrite_rules();
}
