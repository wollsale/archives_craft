
// Namespacing

window.site = (window.site || {});

// Side panel - opened / close

site.SidePanel = (function SidePanel() {

  'use strict';

  /**
   * Has the class been initialized?
   * @private
   */
  var inited = false;

  let $triggerPopup = null;
  let $closePopup = null;
  let $popupOverlay = null;

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

    // Initiate Refer
    initEvents();

    return true;

  };

    // ------------------------------------
    // INIT
    // ------------------------------------

    var initEvents = function() {

        $triggerPopup = [].slice.call(document.querySelectorAll('[data-trigger-refer]'));
        if ($triggerPopup) {
          $triggerPopup.forEach(function (item) {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              openPanel();
            });
          });
        }

        $closePopup = [].slice.call(document.querySelectorAll('[data-close-refer]'));
        if ($closePopup) {
          $closePopup.forEach(function (item) {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              closePanel();
            });
          });
        }

        $popupOverlay = [].slice.call(document.querySelectorAll('.refer-overlay'));
        if ($popupOverlay) {
          $popupOverlay.forEach(function (item) {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              closePanel();
            });
          });
        }
    };

    var openPanel = function() {

      console.log("openPanel");

      document.querySelector('.refer-overlay').classList.add('opened');

      document.querySelector('.refer-popup').classList.add('opened');

      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'absolute';
      document.querySelector('body').style.width = '100%';

    };

    var closePanel = function() {

      console.log("closePanel");

      document.querySelector('.refer-overlay').classList.remove('opened');

      document.querySelector('.refer-popup').classList.remove('opened');

      document.querySelector('body').style.overflow = 'visible';
      document.querySelector('body').style.position = 'relative';
      document.querySelector('body').style.width = '100%';

    };

    return {
      init: init,
      openPanel: openPanel,
      closePanel: closePanel
    };

}());
