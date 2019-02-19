// On Vue Ready
loadjs.ready(['vue', 'axios'], {
  success: function() {


    // Create our Vue component
    var MainNavComponent = new Vue({
      el: '#main-nav-component-todo',
      components: {
      },
      delimiters: ['${', '}'],
      data: {
        navIsOpened: false
      },
      methods: {
        toggleNavOpened: function() {
          this.navIsOpened = !this.navIsOpened;
          document.querySelector('#site-container').classList.toggle('active');
          document.querySelector('.navigation-mobile').classList.toggle('is-active');
        },

        // Pre-render pages when the user mouses over a link
        // Usage: <a href="" @mouseover="prerenderLink">
        prerenderLink: function(e) {

          var head = document.getElementsByTagName("head")[0];
          var refs = head.childNodes;
          ref = refs[ refs.length - 1];

          var elements = head.getElementsByTagName("link");
          Array.prototype.forEach.call(elements, function(el, i) {
            if (("rel" in el) && (el.rel === "prerender"))
              el.parentNode.removeChild(el);
          });

          var prerenderTag = document.createElement("link");
          prerenderTag.rel = "prerender";
          prerenderTag.href = e.currentTarget.href;
          ref.parentNode.insertBefore(prerenderTag,  ref);
        },
      },
      mounted: function() {
      }
    });


  }
});
