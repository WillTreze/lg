/**
 * @version 1.0.0 - October 30, 2023
 */
export class Include {
  /**
   * 
   * @param {HTMLElement} element 
   * @param {number} index
  */
  appendElementInHead(element, index) {
    const head = document.head || document.getElementsByTagName('head')[index ?? 0];
    head.appendChild(element);
  }
  /**
   * 
   * @param {HTMLElement} element 
   */
  appendElementInBody(element) {
    document.body.appendChild(element);
  }
  /**
   * 
   * @param {string} path 
  */
  addMeta(path) {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:image');
    meta.setAttribute('content', path);

    this.appendElementInHead(meta);
  }
  /**
   * 
   * @param {string} path 
  */
  addFavicon(path) {
    const linkElement = document.createElement('link');
    linkElement.rel   = 'icon';
    linkElement.type  = "image/png";
    linkElement.href  = path;

    this.appendElementInHead(linkElement);
  }
  /**
   * 
   * @param {string} title 
   */
  addTitlePage(title) {
    const titlePage = document.createElement('title');
    titlePage.textContent = title;

    this.appendElementInHead(titlePage);
  }
  /**
   * 
   * @param {string} path 
   */
  addStylesheet(path) {
    const linkElement = document.createElement('link');
    linkElement.rel   = 'stylesheet';
    linkElement.type  = 'text/css';
    linkElement.href  = path;

    this.appendElementInHead(linkElement);
  }
  /**
   * 
   * @param {"head"|"body"} includeIn 
   * @param {string} path 
   */
  addScriptSrc(includeIn, path) {
    const script = document.createElement('script');
    script.src = path;
    script.setAttribute('defer', '');
    script.setAttribute('async', '');

    includeIn === 'body' && this.appendElementInBody(script);
    includeIn === 'head' && this.appendElementInHead(script);
  }

  /**
   * 
   * @param {{title: string, featImage: string}} param 
  */
  head({ title, featImage }) {
    this.addTitlePage(title);
    this.addMeta(featImage);
    this.addFavicon('https://ik.imagekit.io/xpld3map0/Icons/favicon.png');
    this.addStylesheet('https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/dist/css/lightgallery.min.css');
    this.addStylesheet('https://cdn.jsdelivr.net/gh/willtreze/lg@1.0.1/gallery-styles@1.0.1.min.css');
    this.addStylesheet('https://cdn.jsdelivr.net/gh/willtreze/lg@1.0.1/global-styles@1.0.1.min.css');
  }
  body() {
    this.addScriptSrc('body', 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js');
    this.addScriptSrc('body', 'https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js');
    this.addScriptSrc('body', 'https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/dist/js/lightgallery.min.js');
    this.addScriptSrc('body', 'https://cdn.rawgit.com/sachinchoolur/lg-fullscreen.js/master/dist/lg-fullscreen.js');
    this.addScriptSrc('body', 'https://cdn.rawgit.com/sachinchoolur/lg-zoom.js/master/dist/lg-zoom.js');
    this.addScriptSrc('body', 'https://sachinchoolur.github.io/lightgallery.js/lightgallery/js/lg-thumbnail.js');
  }
}