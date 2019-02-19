window.site = (window.site || {});

/**
 * Utilities for GeolocationServices
 * @class GeolocationServices
 * @static
 */
site.GeolocationServices = (function GeolocationServices() {

  'use strict';

  /**
   * Has the class been initialized?
   * @private
   */
  var inited = false;
  var $geoLocation = $('#geolocation');
  var config = {
    enableHighAccuracy : true,
    timeout : 30000,
    maximumAge : 0
  };

  var $maps = $('[data-map]');


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

    // Init();

    if ($geoLocation.length) {

      var config = site.App.config('general');

      console.log('[GeolocationServices.js] config', config, config.googleMaps);

      if (config.googleMaps && config.googleMaps !== '') {

        console.log('[GeolocationServices.js] init();');

        $('body').append($('<script src="https://maps.googleapis.com/maps/api/js?v=3&language=en&callback=site.GeolocationServices.initGeolocation&key=' + config.googleMaps + '" ></script>'));

      }

    }

    return true;

  };

  var initGeolocation = function () {

    console.log('[GeolocationServices.js] initGeolocation();');

    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(showPosition, showError, config);
    } else {
      // tempLog('Geolocation is not supported in your browser');
    }

    if ($maps.length) {

      initMaps();
    }
  };

  var showPosition = function (position) {

    // tempLog('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: {lat: parseFloat(lat), lng: parseFloat(long)} }, function(results, status) {

      console.log("ICI");

      if (status === google.maps.GeocoderStatus.OK) {

        console.log("STATUS OK");
        console.log(results[0]);
        // var address = results[0].formatted_address;
        var address = position.coords.latitude + '&nbsp;' + position.coords.longitude;

        console.log(results[0].address_components);

        if (document.getElementById('ageProvince')) {
          document.getElementById('ageProvince').value=results[0].address_components[5].short_name;
        };

        if (document.getElementById('userPostalCode')) {
          document.getElementById('userPostalCode').value=results[0].address_components[7].long_name;
        };

        tempLog(address);
      }

    });
  };

  var showError = function (error) {

    switch(error.code) {
      case error.PERMISSION_DENIED:
        // tempLog("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        // tempLog("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        // tempLog("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        // tempLog("An unknown error occurred.");
        break;
    }
  };

  var tempLog = function (txt) {
    $('#geolocation').html(txt);
    // $('#geolocation').text('');
  };

  /**
   * Initialize Google Maps instances.
   * @public
   */
  var initMaps = function($elements) {

    console.log('[Map.js] initMaps();');

    if (typeof $elements === 'undefined') {
      $elements = $('[data-map]');
    }

    $elements.each(function() {

      console.log('[Map.js] Map Objc = ', $(this));

      var $map = $(this);

      var address = false;
      var lat = false;
      var lng = false;

      // Check if address or coordinates are provided
      if ($map.data('map-address') && $map.data('map-address') !== '') {

        address = $map.data('map-address');

      } else if ($map.data('map-lat') && $map.data('map-lng')) {

        lat = parseFloat($map.data('map-lat')) || false;
        lng = parseFloat($map.data('map-lng')) || false;

      }

      // Map options and styles
      var options = {
        zoom: 15,
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
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
      };

      // Geocode the address or use provided coordinates
      if (address) {

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address: address }, function(results, status) {

          console.log("ICI");

          if (status === google.maps.GeocoderStatus.OK) {

            console.log("STATUS OK");

            var center = results[0].geometry.location;
            var map = new google.maps.Map($map[0], options);
            var image = {
              url: '/assets/images/marker.svg',
              // This marker is 162 pixels wide by 162 pixels high.
              size: new google.maps.Size(162, 162),
              // The origin for this image is (0, 0).
              origin: new google.maps.Point(0, 0),
              // The anchor for this image is the base of the flagpole at (81, 81).
              anchor: new google.maps.Point(81, 81)
            };

            map.set('center', center);

            var marker = new google.maps.Marker({
              map: map,
              icon: image,
              position: center
            });

            google.maps.event.addListener(marker, 'click', function() {
              window.open('https://www.google.ca/maps/dir//' + encodeURIComponent(address), '_blank');
            });

          }

        });

      } else if (lat && lng) {

        var center = new google.maps.LatLng(lat, lng);
        var map = new google.maps.Map($map[0], options);

        map.set('center', center);

        var marker = new google.maps.Marker({
          map: map,
          icon: '/assets/images/marker.svg',
          position: center
        });

        google.maps.event.addListener(marker, 'click', function() {
          window.open('https://www.google.ca/maps/dir//' + lat + ',' + lng, '_blank');
        });

      }

    });

  };

  // Expose public methods & properties
  return {
    init: init,
    initGeolocation: initGeolocation
  };

}());
