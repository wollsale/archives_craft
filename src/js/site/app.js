window.site = (window.site || {});

/**
 * Main application class.
 * @class App
 * @static
 */
window.site.App = (function App() {
  /**
   * Has the class been initialized?
   * @private
   */
  let inited = false;

  /**
   * Application config defaults.
   * @private
   * @param config.env     Current server environment
   * @param config.csrf    Security token to submit with forms
   * @param config.locale  Current locale short code
   * @param config.device  Device detection based on browser signature
   * @param config.preview Page is shown through live preview mode
   * @param config.general Settings from general config
   */
  const config = {
    env: 'production',
    csrf: null,
    locale: 'en',
    device: 'desktop',
    preview: false,
    general: {},
  };

  /**
   * Initializes the class.
   * @public
   */
  const init = function init(options) {
    // Abort if already initialized
    if (inited) {
      return false;
    }

    inited = true;

    // Store application settings
    options = (options || {});

    if (options.env) { config.env = options.env; }
    if (options.csrf) { config.csrf = options.csrf; }
    if (options.locale) { config.locale = options.locale; }
    if (options.device) { config.device = options.device; }
    if (options.preview) { config.preview = options.preview; }
    if (options.general) { config.general = options.general; }

    // Initialize child classes
    if (typeof site.ShareButton === 'object') {site.ShareButton.init();}
    if (typeof site.AjaxPagination === 'object') {site.AjaxPagination.init();}
    if (typeof site.MenuMobile === 'object') {site.MenuMobile.init();}
    if (typeof site.CookiePolicy === 'object') {site.CookiePolicy.init();}
    if (typeof site.ContactPage === 'object') {site.ContactPage.init();}
    if (typeof site.SidePanel === 'object') {site.SidePanel.init();}
    if (typeof site.SidePanelTeam === 'object') {site.SidePanelTeam.init();}
    if (typeof site.Split001Slider === 'object') {site.Split001Slider.init();}
    // if (typeof site.Map === 'object') {site.Map.init();}
    // if (typeof site.GeolocationServices === 'object') {site.GeolocationServices.init();}

    console.table(options);

    // Return success
    return true;
  };

  /**
   * Getter for application config.
   * @public
   */
  const getConfig = function getConfig(option) {
    return config[option] ? config[option] : false;
  };

  /**
   * Expose public methods & properties.
   */
  return {
    init,
    config: getConfig,
  };
}());
