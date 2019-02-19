window.site = (window.site || {});

/**
 * Init Mobile Menu related scripts
 * @class Site
 * @static
 */
site.CookiePolicy = (function CookiePolicy() {

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

    const $cookiePolicy = document.querySelector('.cookie-confirmation');
    const $triggerAccept = $cookiePolicy.querySelector('.confirmation-button');

    if (localStorage.getItem('cookiePolicyAccepted') !== 'accepted') {
      $cookiePolicy.classList.add('is-active');

      $triggerAccept.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('cookiePolicyAccepted', 'accepted');
        $cookiePolicy.classList.remove('is-active');
      });
    }

    return true;

  };

  // Expose public methods & properties
  return {
    init: init,
  };

}());
