window.site = (window.site || {});

/**
 * Init Mobile Menu related scripts
 * @class Site
 * @static
 */
site.ShareButton = (function ShareButton() {

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

    let $buttons = [].slice.call(document.querySelectorAll('.page-subnav .icon'));

    $buttons.forEach($button => {
      $button.addEventListener('click', (e) => {
        e.preventDefault();
        PopupCenter($button.getAttribute('href'), 600, 600);
      });
    });

    return true;

  };

  var PopupCenter = function (url, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, 'Complexe JC Perreault', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }
  };

  // Expose public methods & properties
  return {
    init: init,
  };

}());
