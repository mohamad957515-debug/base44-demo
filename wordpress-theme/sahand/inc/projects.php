<?php
/**
 * "Project" custom post type, its meta fields, gallery and card markup.
 *
 * @package Sahand
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		register_post_type(
			'project',
			array(
				'labels'       => array(
					'name'          => 'پروژه‌ها',
					'singular_name' => 'پروژه',
					'add_new_item'  => 'افزودن پروژه',
					'edit_item'     => 'ویرایش پروژه',
					'search_items'  => 'جست‌وجوی پروژه',
					'not_found'     => 'پروژه‌ای پیدا نشد',
				),
				'public'       => true,
				'has_archive'  => 'projects',
				'rewrite'      => array( 'slug' => 'projects' ),
				'menu_icon'    => 'dashicons-building',
				'supports'     => array( 'title', 'thumbnail', 'editor', 'excerpt', 'page-attributes' ),
				'show_in_rest' => true,
			)
		);

		register_post_type(
			'sahand_lead',
			array(
				'labels'              => array(
					'name'          => 'درخواست‌ها',
					'singular_name' => 'درخواست',
				),
				'public'              => false,
				'show_ui'             => true,
				'exclude_from_search' => true,
				'menu_icon'           => 'dashicons-email-alt',
				'supports'            => array( 'title', 'editor' ),
				'capability_type'     => 'post',
			)
		);
	}
);

/** Meta keys + labels for the project details box. */
function sahand_project_meta_fields() {
	return array(
		'_sahand_type'    => 'نوع پروژه (مثلاً آپارتمان لوکس)',
		'_sahand_city'    => 'منطقه / خیابان',
		'_sahand_state'   => 'شهر',
		'_sahand_country' => 'کشور',
	);
}

add_action(
	'add_meta_boxes',
	function () {
		add_meta_box(
			'sahand_project_details',
			'جزئیات پروژه',
			'sahand_render_project_meta_box',
			'project',
			'normal',
			'high'
		);
	}
);

function sahand_render_project_meta_box( $post ) {
	wp_nonce_field( 'sahand_project_meta', 'sahand_project_meta_nonce' );
	?>
	<div class="sahand-meta">
		<?php foreach ( sahand_project_meta_fields() as $key => $label ) : ?>
			<p>
				<label for="<?php echo esc_attr( $key ); ?>" style="display:block;font-weight:600;margin-bottom:4px;">
					<?php echo esc_html( $label ); ?>
				</label>
				<input
					type="text"
					class="widefat"
					id="<?php echo esc_attr( $key ); ?>"
					name="<?php echo esc_attr( $key ); ?>"
					value="<?php echo esc_attr( (string) get_post_meta( $post->ID, $key, true ) ); ?>"
				/>
			</p>
		<?php endforeach; ?>

		<p>
			<label><input type="checkbox" name="_sahand_featured" value="1" <?php checked( get_post_meta( $post->ID, '_sahand_featured', true ), '1' ); ?> /> نمایش در «پروژه‌های شاخص» صفحه اصلی</label><br />
			<label><input type="checkbox" name="_sahand_new" value="1" <?php checked( get_post_meta( $post->ID, '_sahand_new', true ), '1' ); ?> /> نشان «جدید» روی تصویر</label>
		</p>

		<p style="margin-top:18px;">
			<label style="display:block;font-weight:600;margin-bottom:6px;">گالری تصاویر</label>
			<input type="hidden" id="sahand-gallery-ids" name="_sahand_gallery" value="<?php echo esc_attr( (string) get_post_meta( $post->ID, '_sahand_gallery', true ) ); ?>" />
			<div id="sahand-gallery-preview" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;"></div>
			<button type="button" class="button" id="sahand-gallery-add">افزودن تصاویر گالری</button>
			<button type="button" class="button-link" id="sahand-gallery-clear" style="margin-inline-start:8px;">پاک کردن</button>
			<span class="description" style="display:block;margin-top:6px;">تصویر شاخص (Featured image) اولین تصویر گالری است.</span>
		</p>
	</div>
	<?php
}

add_action(
	'save_post_project',
	function ( $post_id ) {
		if ( ! isset( $_POST['sahand_project_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['sahand_project_meta_nonce'] ) ), 'sahand_project_meta' ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		foreach ( array_keys( sahand_project_meta_fields() ) as $key ) {
			$value = isset( $_POST[ $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) : '';
			update_post_meta( $post_id, $key, $value );
		}

		update_post_meta( $post_id, '_sahand_featured', isset( $_POST['_sahand_featured'] ) ? '1' : '0' );
		update_post_meta( $post_id, '_sahand_new', isset( $_POST['_sahand_new'] ) ? '1' : '0' );

		$gallery = isset( $_POST['_sahand_gallery'] ) ? sanitize_text_field( wp_unslash( $_POST['_sahand_gallery'] ) ) : '';
		$gallery = implode( ',', array_filter( array_map( 'absint', explode( ',', $gallery ) ) ) );
		update_post_meta( $post_id, '_sahand_gallery', $gallery );
	}
);

/** Project meta as a tidy array. */
function sahand_project_meta( $post_id ) {
	return array(
		'type'     => (string) get_post_meta( $post_id, '_sahand_type', true ),
		'city'     => (string) get_post_meta( $post_id, '_sahand_city', true ),
		'state'    => (string) get_post_meta( $post_id, '_sahand_state', true ),
		'country'  => (string) get_post_meta( $post_id, '_sahand_country', true ),
		'is_new'   => '1' === get_post_meta( $post_id, '_sahand_new', true ),
		'featured' => '1' === get_post_meta( $post_id, '_sahand_featured', true ),
	);
}

/** All image URLs for a project: featured image first, then gallery. */
function sahand_project_images( $post_id ) {
	$images = array();

	$thumb = get_post_thumbnail_id( $post_id );
	if ( $thumb ) {
		$images[] = wp_get_attachment_image_url( $thumb, 'large' );
	}

	$gallery = (string) get_post_meta( $post_id, '_sahand_gallery', true );
	foreach ( array_filter( array_map( 'absint', explode( ',', $gallery ) ) ) as $attachment_id ) {
		$url = wp_get_attachment_image_url( $attachment_id, 'large' );
		if ( $url && ! in_array( $url, $images, true ) ) {
			$images[] = $url;
		}
	}

	// Fallback: remote photo URLs (used before/without importing media).
	if ( empty( $images ) ) {
		$remote = (string) get_post_meta( $post_id, '_sahand_images', true );
		foreach ( array_filter( array_map( 'trim', explode( ',', $remote ) ) ) as $url ) {
			if ( $url && ! in_array( $url, $images, true ) ) {
				$images[] = $url;
			}
		}
	}

	return array_values( array_filter( $images ) );
}

/** Location line, e.g. «خیابان بوستان، کرج». */
function sahand_project_location( $post_id ) {
	$meta  = sahand_project_meta( $post_id );
	$parts = array_filter( array( $meta['city'], $meta['state'] ) );
	return implode( '، ', $parts );
}

/** Save/favorite toggle used on cards and the single project header. */
function sahand_favorite_button( $post_id, $with_label = false ) {
	$classes = $with_label
		? 'grid place-items-center rounded-full border border-navy/15 text-navy hover:border-navy hover:bg-navy transition-all duration-300 js-favorite h-11 w-full px-4'
		: 'grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy backdrop-blur hover:bg-navy hover:text-white transition-all duration-300 js-favorite';
	?>
	<button
		type="button"
		class="<?php echo esc_attr( $classes ); ?>"
		data-project-id="<?php echo esc_attr( $post_id ); ?>"
		aria-pressed="false"
		aria-label="افزودن به علاقه‌مندی‌ها"
	>
		<?php sahand_the_icon( 'heart', 17 ); ?>
		<?php if ( $with_label ) : ?>
			<span class="ms-2 text-sm font-semibold js-favorite-label">ذخیره</span>
		<?php endif; ?>
	</button>
	<?php
}

/**
 * Project card markup (same composition as the React card).
 *
 * @param int  $post_id Project ID.
 * @param bool $large   Editorial size used for the first carousel slide.
 */
function sahand_project_card( $post_id, $large = false ) {
	$brand    = sahand_brand();
	$meta     = sahand_project_meta( $post_id );
	$images   = sahand_project_images( $post_id );
	$location = sahand_project_location( $post_id );
	$title    = get_the_title( $post_id );
	?>
	<div class="group">
		<div class="relative overflow-hidden rounded-2xl bg-navy-100">
			<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" class="block focus-visible:outline-offset-4" aria-label="<?php echo esc_attr( 'مشاهده ' . $title ); ?>">
				<?php if ( $images ) : ?>
					<img
						src="<?php echo esc_url( $images[0] ); ?>"
						alt="<?php echo esc_attr( $title ); ?>"
						loading="lazy"
						class="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 <?php echo $large ? 'aspect-[16/10]' : 'aspect-[4/3]'; ?>"
					/>
				<?php else : ?>
					<span class="flex w-full items-center justify-center bg-navy-100 text-sm font-semibold text-navy/40 <?php echo $large ? 'aspect-[16/10]' : 'aspect-[4/3]'; ?>">
						<?php echo esc_html( $title ); ?>
					</span>
				<?php endif; ?>
			</a>

			<?php if ( $meta['type'] ) : ?>
				<span class="absolute start-4 top-4 rounded-full bg-navy-950/60 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
					<?php echo esc_html( $meta['type'] ); ?>
				</span>
			<?php endif; ?>

			<?php if ( $meta['is_new'] ) : ?>
				<span class="absolute bottom-4 start-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-navy-950">جدید</span>
			<?php endif; ?>

			<span class="absolute end-4 top-4">
				<?php sahand_favorite_button( $post_id ); ?>
			</span>
		</div>

		<div class="mt-5 flex items-start justify-between gap-4">
			<div class="min-w-0">
				<h3 class="font-semibold tracking-tight text-navy transition-colors duration-300 group-hover:text-gold <?php echo $large ? 'text-2xl' : 'text-lg'; ?>">
					<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"><?php echo esc_html( $title ); ?></a>
				</h3>
				<?php if ( $location ) : ?>
					<p class="mt-1.5 flex items-center gap-1.5 text-sm text-ink/60">
						<?php sahand_the_icon( 'map-pin', 14, 'shrink-0 text-gold' ); ?>
						<?php echo esc_html( $location ); ?>
					</p>
				<?php endif; ?>
			</div>

			<a href="<?php echo esc_url( $brand['phone_href'] ); ?>" class="shrink-0 text-end transition-colors hover:text-gold">
				<span class="block text-[11px] font-medium text-ink/40">مشاوره و بازدید</span>
				<span dir="ltr" class="mt-1 flex items-center justify-end gap-1.5 font-bold text-navy <?php echo $large ? 'text-lg' : 'text-sm'; ?>">
					<?php sahand_the_icon( 'phone', 13, 'text-gold' ); ?>
					<?php echo esc_html( $brand['phone'] ); ?>
				</span>
			</a>
		</div>

		<a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors duration-300 hover:text-gold">
			<?php sahand_the_icon( 'send', 14, 'text-gold' ); ?>
			ثبت درخواست مشاوره
		</a>
	</div>
	<?php
}

/** Related projects: same city/type first, then latest. */
function sahand_related_projects( $post_id, $limit = 3 ) {
	$meta = sahand_project_meta( $post_id );

	$query = new WP_Query(
		array(
			'post_type'      => 'project',
			'posts_per_page' => $limit,
			'post__not_in'   => array( $post_id ),
			'orderby'        => 'date',
			'order'          => 'DESC',
			'meta_query'     => array(
				'relation' => 'OR',
				array(
					'key'   => '_sahand_city',
					'value' => $meta['city'],
				),
				array(
					'key'   => '_sahand_type',
					'value' => $meta['type'],
				),
			),
		)
	);

	if ( ! $query->have_posts() ) {
		$query = new WP_Query(
			array(
				'post_type'      => 'project',
				'posts_per_page' => $limit,
				'post__not_in'   => array( $post_id ),
			)
		);
	}

	return $query;
}
