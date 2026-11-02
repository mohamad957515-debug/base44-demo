<?php
/**
 * Site header.
 *
 * @package Sahand
 */

$sahand_brand = sahand_brand();
$sahand_solid = is_front_page() ? 'false' : 'true';
?><!doctype html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header
	id="site-header"
	data-solid="<?php echo esc_attr( $sahand_solid ); ?>"
	class="group fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-500 data-[solid=true]:bg-white/95 data-[solid=true]:shadow-[0_1px_0_rgba(10,35,66,0.08)] data-[solid=true]:backdrop-blur-md"
>
	<div class="container-x flex h-[76px] items-center justify-between">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( $sahand_brand['name'] . ' — صفحه اصلی' ); ?>" class="flex items-center gap-2.5">
			<svg viewBox="0 0 32 32" fill="currentColor" class="h-8 w-8 shrink-0 text-gold" aria-hidden="true">
				<rect x="6.5" y="13" width="3" height="10" rx="0.6" />
				<rect x="12.2" y="7" width="3" height="16" rx="0.6" />
				<rect x="17.9" y="10.5" width="3" height="12.5" rx="0.6" />
				<rect x="6.5" y="25" width="14.4" height="1.8" rx="0.9" />
			</svg>
			<span class="text-base font-bold leading-[1.2] text-white group-data-[solid=true]:text-navy">
				سهند
				<span class="block text-[10px] font-semibold text-gold">گروه ساختمانی</span>
			</span>
		</a>

		<nav class="hidden items-center gap-8 lg:flex" aria-label="ناوبری اصلی">
			<?php foreach ( sahand_nav_links() as $sahand_link ) : ?>
				<?php
				$sahand_is_active = false;
				if ( 'route' === $sahand_link['kind'] ) {
					if ( home_url( '/' ) === $sahand_link['url'] ) {
						$sahand_is_active = is_front_page();
					} elseif ( 'project' === get_post_type() || is_post_type_archive( 'project' ) ) {
						$sahand_is_active = false !== strpos( $sahand_link['url'], 'projects' );
					} elseif ( is_page( 'contact' ) ) {
						$sahand_is_active = false !== strpos( $sahand_link['url'], 'contact' );
					}
				}
				?>
				<a
					href="<?php echo esc_url( $sahand_link['url'] ); ?>"
					class="relative text-[13px] font-semibold transition-colors duration-300 after:absolute after:-bottom-1.5 after:right-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100 <?php echo $sahand_is_active ? 'text-white after:scale-x-100 group-data-[solid=true]:text-navy' : 'text-white/70 hover:text-white group-data-[solid=true]:text-navy/70 group-data-[solid=true]:hover:text-navy'; ?>"
				>
					<?php echo esc_html( $sahand_link['label'] ); ?>
				</a>
			<?php endforeach; ?>
		</nav>

		<div class="hidden lg:block">
			<a
				href="<?php echo esc_url( $sahand_brand['phone_href'] ); ?>"
				class="inline-flex items-center gap-2.5 rounded-full border border-white/40 px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:border-gold hover:text-gold group-data-[solid=true]:border-navy/25 group-data-[solid=true]:text-navy group-data-[solid=true]:hover:border-navy group-data-[solid=true]:hover:bg-navy group-data-[solid=true]:hover:text-white"
			>
				<?php sahand_the_icon( 'phone', 14 ); ?>
				<span dir="ltr"><?php echo esc_html( $sahand_brand['phone'] ); ?></span>
			</a>
		</div>

		<button
			type="button"
			id="menu-toggle"
			aria-expanded="false"
			aria-controls="mobile-menu"
			aria-label="باز کردن منو"
			class="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 group-data-[solid=true]:text-navy group-data-[solid=true]:hover:bg-navy/5 lg:hidden"
		>
			<span class="js-icon-menu"><?php sahand_the_icon( 'menu', 22 ); ?></span>
			<span class="js-icon-close hidden"><?php sahand_the_icon( 'x', 22 ); ?></span>
		</button>
	</div>
</header>

<div
	id="mobile-menu"
	class="anim-fade fixed inset-0 z-40 hidden flex-col bg-navy-950 pt-[76px] lg:hidden"
	role="dialog"
	aria-modal="true"
	aria-label="منوی سایت"
>
	<nav class="container-x flex flex-1 flex-col justify-center gap-1 pb-16" aria-label="منوی موبایل">
		<?php $sahand_i = 0; ?>
		<?php foreach ( sahand_nav_links() as $sahand_link ) : ?>
			<a
				href="<?php echo esc_url( $sahand_link['url'] ); ?>"
				style="animation-delay: <?php echo esc_attr( 60 + $sahand_i * 55 ); ?>ms"
				class="menu-item border-b border-white/10 py-4 text-2xl font-semibold text-white/90 transition-colors hover:text-gold"
			>
				<?php echo esc_html( $sahand_link['label'] ); ?>
			</a>
			<?php $sahand_i++; ?>
		<?php endforeach; ?>

		<div class="menu-item mt-8 flex flex-col gap-3 text-white/70" style="animation-delay: 420ms">
			<a href="<?php echo esc_url( $sahand_brand['phone_href'] ); ?>" class="flex items-center gap-3 text-lg font-semibold text-white">
				<?php sahand_the_icon( 'phone', 18, 'text-gold' ); ?>
				<span dir="ltr"><?php echo esc_html( $sahand_brand['phone'] ); ?></span>
			</a>
			<a href="<?php echo esc_url( $sahand_brand['email_href'] ); ?>" class="flex items-center gap-3 text-sm">
				<?php sahand_the_icon( 'mail', 16, 'text-gold' ); ?>
				<?php echo esc_html( $sahand_brand['email'] ); ?>
			</a>
		</div>
	</nav>
</div>

<main id="main">
