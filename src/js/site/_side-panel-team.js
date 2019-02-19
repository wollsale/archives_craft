
// Namespacing

window.site = (window.site || {});

// Side panel - opened / close

site.SidePanelTeam = (function SidePanelTeam() {

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

        $triggerPopup = [].slice.call(document.querySelectorAll('[data-trigger-team-grid]'));
        if ($triggerPopup) {
          $triggerPopup.forEach(function (item) {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              openPanel();
            });
          });
        }

        $closePopup = [].slice.call(document.querySelectorAll('[data-close-team-grid]'));
        if ($closePopup) {
          $closePopup.forEach(function (item) {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              closePanel();
            });
          });
        }

        $popupOverlay = [].slice.call(document.querySelectorAll('.team-grid-overlay'));
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

      document.querySelector('.team-grid-overlay').classList.add('opened');

      document.querySelector('.team-grid-popup').classList.add('opened');

      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('body').style.position = 'absolute';
      document.querySelector('body').style.width = '100%';

    };

    var closePanel = function() {

      console.log("closePanel");

      document.querySelector('.team-grid-overlay').classList.remove('opened');

      document.querySelector('.team-grid-popup').classList.remove('opened');

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
