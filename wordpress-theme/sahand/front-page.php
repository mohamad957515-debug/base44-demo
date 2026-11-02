<?php
/**
 * Front page: section stack.
 *
 * @package Sahand
 */

get_header();

get_template_part( 'template-parts/home/hero' );
get_template_part( 'template-parts/home/about' );
get_template_part( 'template-parts/home/featured' );
get_template_part( 'template-parts/home/services' );
get_template_part( 'template-parts/home/why' );
get_template_part( 'template-parts/home/process' );
get_template_part( 'template-parts/home/cta' );

get_footer();
