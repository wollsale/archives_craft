/* -- A listener to ensure the fonts we need to use have been loaded */

if (document.documentElement.className.indexOf( "fonts-loaded" ) < 0 ) {
    var fontello = new FontFaceObserver("fontello", {});
    // var gtBold = new FontFaceObserver("gt_americabold", {});
    // var gtMedium = new FontFaceObserver("gt_americamedium", {});
    // var gtRegular = new FontFaceObserver("gt_americaregular", {});
    // var gtSectraBold = new FontFaceObserver("gt_sectrabold", {});

    Promise.all([
        fontello.load('')
        // gtBold.load(),
        // gtMedium.load(),
        // gtRegular.load(),
        // gtSectraBold.load()
    ]).then(function() {

      document.documentElement.className += " fonts-loaded";
      Cookie.set('fonts-loaded', 1, { expires: '7D', secure: true });
    });
}
