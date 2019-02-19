window.site = (window.site || {});

/**
 * Init Mobile Menu related scripts
 * @class Site
 * @static
 */
site.Split001Slider = (function Split001Slider() {

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

    let $slider = [].slice.call(document.querySelectorAll('.gallery-slides'));

    if ($slider) {

      setTimeout(() => {
        $slider.forEach(($slide) => {
            var flkty = new Flickity($slide, {
              // options
              cellAlign: 'left',
              contain: true,
              pageDots: false,
              imagesLoaded: true,
              autoPlay: 5000,
              wrapAround: true,
              lazyLoad: true
            });
          }
        );
      }, 200);
    }

    return true;

  };

  // Expose public methods & properties
  return {
    init: init,
  };

}());
