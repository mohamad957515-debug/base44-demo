<?php
/**
 * Inline SVG icon set (same glyphs as the site's Lucide icons).
 *
 * @package Sahand
 */

defined( 'ABSPATH' ) || exit;

/**
 * Returns an inline SVG icon.
 *
 * @param string $name  Icon key.
 * @param int    $size  Pixels.
 * @param string $class Extra CSS classes.
 */
function sahand_icon( $name, $size = 16, $class = '' ) {
	$paths = array(
		'phone'            => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
		'mail'             => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
		'map-pin'          => '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
		'menu'             => '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
		'x'                => '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
		'arrow-left'       => '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
		'arrow-right'      => '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
		'chevron-left'     => '<path d="m15 18-6-6 6-6"/>',
		'check'            => '<path d="M20 6 9 17l-5-5"/>',
		'check-circle'     => '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
		'send'             => '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
		'calendar'         => '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
		'calendar-days'    => '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>',
		'search'           => '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
		'sliders'          => '<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/>',
		'rotate'           => '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
		'key'              => '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
		'heart'            => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
		'clock'            => '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
		'maximize'         => '<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/>',
		'facebook'         => '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
		'instagram'        => '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
		'linkedin'         => '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
		'twitter'          => '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
	);

	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}

	return sprintf(
		'<svg xmlns="http://www.w3.org/2000/svg" width="%1$d" height="%1$d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="%2$s" aria-hidden="true">%3$s</svg>',
		(int) $size,
		esc_attr( $class ),
		$paths[ $name ]
	);
}

/** Echos an inline icon. */
function sahand_the_icon( $name, $size = 16, $class = '' ) {
	echo sahand_icon( $name, $size, $class ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static SVG markup.
}
