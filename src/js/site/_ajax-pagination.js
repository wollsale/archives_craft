window.site = (window.site || {});

/**
 * Init AjaxPagination related scripts
 * @class Site
 * @static
 */
site.AjaxPagination = (function AjaxPagination() {

    'use strict';

    /**
     * jQuery elements
     * @private
     */

    /**
     * Has the class been initialized?
     * @private
     */
    let inited = false;
    const $pagniations = $('[data-ajax-pagination]');

    /**
     * Initializes the class.
     * @public
     */
    const init = function () {

        // Abort if already initialized
        if (inited) {
            return false;
        }

        inited = true;

        $pagniations.addEventListener('click', function(e){

          e.preventDefault();

          if (!e.target.matches('a') && !e.target.matches('span')) { return }

          let $page = null;

          if (e.target.matches('span')) {
            $page = e.target.parentNode;
          } else {
            $page = e.target;
          }

          if (!$page) { return }

          const $pagination = $page.parentNode.parentNode;
          const zone = $pagination.dataset.ajaxPagination;
          const $ajaxZone = document.querySelector('[data-ajax-paginate="' + zone + '"]');

          const $loader = '<div class="loader-container" style="height: ' + $ajaxZone.clientHeight + 'px;"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div>';
          const apiURL = $page.getAttribute('href');

          $ajaxZone.innerHTML = $loader;

          fetch(apiURL, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'GET'
          })
          .then((resp) => resp.text())
          .then(function(data) {

            if (data) {

              // Fetch and transform response to an HTML object
              const htmlResponse = document.createElement('div');
              htmlResponse.innerHTML = data;

              const $refreshArticle = htmlResponse.querySelector('[data-ajax-paginate="' + $pagination.getAttribute('data-ajax-pagination') + '"]').innerHTML;
              $ajaxZone.innerHTML = $refreshArticle;

              $pagination.innerHTML = htmlResponse.querySelector('[data-ajax-pagination="' + $pagination.getAttribute('data-ajax-pagination') + '"]').innerHTML;
            }
          });
        });

        return true;

    };

    // Expose public methods & properties
    return {
        init: init,
    };

}());
