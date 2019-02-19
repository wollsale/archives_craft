window.site = (window.site || {});

/**
 * Utilities for Google Maps.
 * @class Map
 * @static
 */
site.Map = (function Map() {

  'use strict';

  /**
   * Has the class been initialized?
   * @private
   */
  var inited = false;

  /**
   * jQuery elements.
   */
  var $maps = $('[data-map]');

  /**
   * Initializes the class.
   * @public
   */
  var init = function() {

    // Abort if already initialized
    if (inited) {
      return false;
    }

    inited = true;

    console.log("[Map.js] init();");

    // Load Google Maps script
    if ($maps.length) {

      console.log("1");

      var config = site.App.config('general');
      var locale = site.App.config('locale');

      if (config.googleMaps && config.googleMaps !== '') {

        console.log("2");

        var $body = document.querySelector("body");

        $body.innerHTML += '<script src="https://maps.googleapis.com/maps/api/js?v=3&callback=site.Map.initMaps&language=' + locale + '&key=' + config.googleMaps + '"><script/>';

      }

    }

    // initMaps();

    // Return success
    return true;

  };

  /**
   * Initialize Google Maps instances.
   * @public
   */
  var initMaps = function($elements) {

    console.log("initMaps();");

    if (typeof $elements === 'undefined') {
      $elements = $('[data-map]');
    }

    $elements.forEach(function(element) {

      console.log(element);

    });

  };

  // Expose public methods & properties
  return {
    init: init,
    initMaps: initMaps
  };

}());
