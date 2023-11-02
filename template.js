export class Template {
  static Loading() {
    const code = `
      <style>
        #loading{
          position: fixed;
          z-index: 9999;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #loading svg {
          width: 80px;
          opacity: 0.5;
        }
      </style>
      <section id="loading">
        <svg with="80" height="80" version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0"
          xml:space="preserve">
          <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 15 ; 0 -15; 0 15"
              repeatCount="indefinite" begin="0.1" />
          </circle>
          <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10"
              repeatCount="indefinite" begin="0.2" />
          </circle>
          <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
            <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite" begin="0.3" />
          </circle>
        </svg>
      </section>
    `
    const template = document.createElement('template');
    template.setAttribute('id', 'js-template-loading');

    template.innerHTML = code;
    document.body.appendChild(template);
  }

  render(type) {
    switch(type) {
      case 'loading':
        Template.Loading();
      break;

      default:
        break;
    }
  }
}