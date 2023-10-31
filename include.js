/**
 * @version 1.0.1 - October 30, 2023
 */
export class Include {
  /**
   * 
   * @param {HTMLElement} element 
   * @param {number} index
  */
  static appendElementInHead(element, index) {
    const head = document.head || document.getElementsByTagName('head')[index ?? 0];
    head.appendChild(element);
  }
  /**
   * 
   * @param {HTMLElement} element 
   */
  static appendElementInBody(element) {
    document.body.appendChild(element);
  }
  /**
   * 
   * @param {string} path 
  */
  static addMeta(path) {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:image');
    meta.setAttribute('content', path);

    Include.appendElementInHead(meta);
  }
  /**
   * 
   * @param {string} path 
  */
  static addFavicon(path) {
    const linkElement = document.createElement('link');
    linkElement.rel   = 'icon';
    linkElement.type  = "image/png";
    linkElement.href  = path;

    Include.appendElementInHead(linkElement);
  }
  /**
   * 
   * @param {string} title 
   */
  static addTitlePage(title) {
    const titlePage = document.createElement('title');
    titlePage.textContent = title;

    Include.appendElementInHead(titlePage);
  }
  /**
   * 
   * @param {string} path 
   */
  static addStylesheet(path) {
    const linkElement = document.createElement('link');
    linkElement.rel   = 'stylesheet';
    linkElement.type  = 'text/css';
    linkElement.href  = path;

    Include.appendElementInHead(linkElement);
  }
  /**
   * 
   * @param {"head"|"body"} includeIn 
   * @param {string} path 
   */
  static addScriptSrc(includeIn, path) {
    const script = document.createElement('script');
    script.src = path;
    script.setAttribute('defer', '');
    script.setAttribute('async', '');

    includeIn === 'body' && Include.appendElementInBody(script);
    includeIn === 'head' && Include.appendElementInHead(script);
  }

  /**
   * 
   * @param {{title: string, featImage: string}} param 
  */
  head() {
    // Include.addTitlePage(title);
    // Include.addMeta(featImage);
    Include.addFavicon('https://ik.imagekit.io/xpld3map0/Icons/favicon.png');
    Include.addStylesheet('https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/dist/css/lightgallery.min.css');
    Include.addStylesheet('https://cdn.jsdelivr.net/gh/willtreze/lg@1.0.1/gallery-styles@1.0.1.min.css');
    Include.addStylesheet('https://cdn.jsdelivr.net/gh/willtreze/lg@1.0.1/global-styles@1.0.1.min.css');
  }
  body() {
    Include.addScriptSrc('body', 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js');
    Include.addScriptSrc('body', 'https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js');
    Include.addScriptSrc('body', 'https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/dist/js/lightgallery.min.js');
    Include.addScriptSrc('body', 'https://cdn.rawgit.com/sachinchoolur/lg-fullscreen.js/master/dist/lg-fullscreen.js');
    Include.addScriptSrc('body', 'https://cdn.rawgit.com/sachinchoolur/lg-zoom.js/master/dist/lg-zoom.js');
    Include.addScriptSrc('body', 'https://sachinchoolur.github.io/lightgallery.js/lightgallery/js/lg-thumbnail.js');
  }
}