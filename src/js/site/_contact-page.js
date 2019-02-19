window.site = (window.site || {});

/**
 * Utilities for Google Maps.
 * @class Map
 * @static
 */
site.ContactPage = function ContactPage() {

  'use strict';

  /**
   * Has the class been initialized?
   * @private
   */
  var inited = false;

  /**
   * jQuery elements.
   */
  const $maps = [].slice.call(document.querySelectorAll('[data-map]'));
  const $btns = [].slice.call(document.querySelectorAll('.js-map-btn'));
  let sliderInited = false;
  let $carousel = null;
  const $mobileSlider = document.querySelector('.mobile-slider');
  const mobileSlide = '.mobile-slide';

  /**
   * Initialize Google Maps instances.
   * @public
   */
  var initMaps = function ($elements) {

    if (typeof $elements === 'undefined') {
      $elements = [].slice.call(document.querySelectorAll('[data-map]'));
    }

    $elements.forEach(($map) => {
      let address = false;
      let lat = false;
      let lng = false;
      const latlng = false;

      // Check if address or coordinates are provided
      if ($map.getAttribute('data-map-address') && $map.getAttribute('data-map-address') !== '') {
        address = $map.getAttribute('data-map-address');
      } else if ($map.getAttribute('data-map-lat') && $map.getAttribute('data-map-lng')) {
        lat = parseFloat($map.getAttribute('data-map-lat')) || false;
        lng = parseFloat($map.getAttribute('data-map-lng')) || false;
      }

      // Map options and styles
      const options = {
        zoom: 17,
        minZoom: 1,
        draggable: site.App.config('device') === 'desktop',
        scrollwheel: false,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        zoomControl: false,
        streetViewControl: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: false,
        styles: [{
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
        }, {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
        }, {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{"color": "#dedede"}, {"lightness": 21}]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
        }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
        }]
      };

      // Geocode the address or use provided coordinates
      if (address) {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({address: address}, function (results, status) {

          if (status === google.maps.GeocoderStatus.OK) {

            var center = results[0].geometry.location;
            var map = new google.maps.Map($map, options);

            map.set('center', center);

            var marker = new google.maps.Marker({
              map: map,
              icon: '/img/site/icon-marker.svg',
              position: latlng
            });

            google.maps.event.addListener(marker, 'click', function () {
              window.open('https://www.google.ca/maps/dir//' + encodeURIComponent(address), '_blank');
            });

          }

        });

      } else if (lat && lng) {

        var center = new google.maps.LatLng(lat, lng);
        var map = new google.maps.Map($map, options);

        map.set('center', center);

        var marker = new google.maps.Marker({
          map: map,
          icon: '/img/site/icon-marker.svg',
          position: center
        });

        google.maps.event.addListener(marker, 'click', function () {
          window.open('https://www.google.ca/maps/dir//' + lat + ',' + lng, '_blank');
        });

      }

    });

  };

  var ressizeWindowFunction = function () {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    if (x < 768 && !sliderInited) {
      $carousel = new Flickity( $mobileSlider, {
        'cellSelector': mobileSlide,
        'cellAlign': 'center',
        'contain': true,
        'wrapAround': true,
        'prevNextButtons': true,
        'pageDots': false,
        'imagesLoaded': true
      });

      sliderInited = true;
    } else if (x > 768 && sliderInited) {
      $carousel.destroy();
      sliderInited = false;
    }
  };

  var openMap = function (button) {
    const myMap = document.querySelector(button.getAttribute('data-map-holder'));

    $btns.forEach(($btn) => {
      $btn.classList.remove('is-active');
    });

    button.classList.add('is-active');

    $maps.forEach(($map) => {
      $map.classList.remove('is-active');
    });

    myMap.classList.add('is-active');
  };

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

    const elem = document.querySelector('.mobile-slider');

    if (elem) {

      window.addEventListener('resize', () => {
        ressizeWindowFunction();
      });

      ressizeWindowFunction();
    }

    $btns.forEach(($btn) => {
      $btn.addEventListener('click', () => {
        openMap($btn);
      });
    });

    // Return success
    return true;

  };

  // Expose public methods & properties
  return {
    init: init,
    initMaps: initMaps
  };

}();
