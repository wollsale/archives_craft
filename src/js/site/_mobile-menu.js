window.site = (window.site || {});

/**
 * Init Mobile Menu related scripts
 * @class Site
 * @static
 */
site.MenuMobile = (function MenuMobile() {

  'use strict';

  /**
   * jQuery elements
   * @private
   */

  /**
   * Has the class been initialized?
   * @private
   */
  var inited = false;

  /**
   * Initializes the class.
   * @public
   */
  var init = function () {

    // Abort if already initialized
    if (inited) {
      return false;
    }

    inited = true;

    const $trigger = document.querySelector('.mobile-menu-trigger');
    const $triggerClose = document.querySelector('.navigation-close');

    $trigger.addEventListener('click', (e) => {
      const $main = document.querySelector('.site-container');
      const $menu = document.querySelector('.navigation-mobile');

      $main.classList.toggle('active');
      $menu.classList.toggle('is-active');
    });

    $triggerClose.addEventListener('click', (e) => {
      const $main = document.querySelector('.site-container');
      const $menu = document.querySelector('.navigation-mobile');

      $main.classList.toggle('active');
      $menu.classList.toggle('is-active');
    });

    // Activate Follow Sticky
    activateMenuFollow();

    return true;

  };

  const activateMenuFollow = function () {

    const $nav = document.querySelector('#main-header');
    const buffer = 10;

    let lastScrollTop = 0;

    let st = document.documentElement.scrollTop;

    if( st >= 158 ){
      $nav.classList.remove('is-sticky');
    }else{
      $nav.classList.remove('is-sticky');
    }

    window.addEventListener("scroll", () => {

      let st = document.documentElement.scrollTop;

      // console.log(st);

      if( st >= 158 ){
        $nav.classList.add('is-sticky');
      }else{
        $nav.classList.remove('is-sticky');
      }

      if (st > lastScrollTop){
        // downscroll code
        $nav.classList.add( "hide-nav-bar" );
      } else if( st < ( lastScrollTop - buffer ) ){
        // upscroll code
        $nav.classList.remove( "hide-nav-bar" );
      }

      if(st <= 15){
        $nav.classList.remove( "hide-nav-bar" );
      }

      lastScrollTop = st;
    });
  };

  // Expose public methods & properties
  return {
    init: init,
  };

}());
