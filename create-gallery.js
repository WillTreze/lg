/**
 * @version 1.0.0 - October 30, 2023
 */

export class CreateGallery {
  static querySelector(selector) {
    return document.querySelector(selector);
  }

  /**
   * 
   * @param {{name:string|number}} array 
   * @returns
   */
  static sortData(array) {
    const checkIfArrayContainsOnlyNumbers = () => {
      const arrayOfNames = array.map(({name}) => name)
      
      for (let i = 0; i < arrayOfNames.length; i++) {
        if (/^\d+$/.test(arrayOfNames[i])) {
          return true;
        }
      }
      return false;
    }

    const hasOnlyNumbers = checkIfArrayContainsOnlyNumbers();

    if (hasOnlyNumbers) {
      return array.sort((a, b) => a.name && parseInt(a.name) - parseInt(b.name));
    } else {
      return array.sort((a, b) => {
        if (a.name) {
          const nomeA = a.name.toUpperCase();
          const nomeB = b.name.toUpperCase();
  
          if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
        }
        return 0;
      });
    }
  }

  static showLoading() {
    const loading = CreateGallery.querySelector('#loading');
    loading.style.display = 'flex';
  }

  static hideLoading() {
    const loading = CreateGallery.querySelector('#loading');
    loading.classList.add('fade-out');
  
    setTimeout(() => {
      loading.style.display = 'none';
    }, 1100);
  }

  /**
   * 
   * @param {HTMLElement} targetElement 
   */
  static createMasonry() {
    try {
      const targetElement = CreateGallery.querySelector('.grid');   
      const masonry = new Masonry(targetElement, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 0,
      });
  
      masonry.layout();
      
    } catch (error) { console.error(error) };
  }

  static createLightGallery() {
    try {
      const targetElement = CreateGallery.querySelector('#light-gallery');
  
      lightGallery(targetElement, {
        thumbnail: true,
        animateThumb: true,
        showThumbByDefault: false,
        selector: '.grid-wrapper-item',
        exThumbImage: 'data-thumb',
      }); 

    } catch (error) { console.error(error) };
  }

  /**
   * 
   * @param {[{ link: string, thumb: string, id: string|number|null, name: string|number|null },]} data 
  */
  static imgurGallery(data) {
    data.forEach(image => {
      const img = document.createElement('img');
      const div = document.createElement('div');

      div.setAttribute('data-src', image.link);
      div.setAttribute('id', image.id|| Math.random().toString(36).substring(2));

      div.setAttribute('data-thumb', image.link.replace(/(\.[^/.]+)$/, "t$1"))

      div.className = "grid-wrapper-item";

      img.src = image.link.replace(/(\.[^/.]+)$/, "l$1");
      img.title = image.name;
      img.className = "grid-item"

      div.appendChild(img);
      document.getElementById('light-gallery').appendChild(div);
    });
  }
  
  /**
   * 
   * @param {[{ link: string, thumb: string, id: string|number|null, name: string|number|null },]} data 
  */
  static commonGallery(data) {
    data.forEach(image => {
      const img = document.createElement('img');
      const div = document.createElement('div');

      div.setAttribute('data-src', image.link);
      div.setAttribute('id', image.id || Math.random().toString(36).substring(2));
      div.setAttribute('data-thumb', image.thumb || image.link);
      div.className = "grid-wrapper-item";

      img.src = image.thumb || image.link
      img.className = "grid-item";

      div.appendChild(img);
      document.getElementById('light-gallery').appendChild(div);
    });
  }

  /**
   * 
   * @param {"imgur"|"github"|'g-drive'|'other'} host
   * @param {[{ link: string, thumb: string, id: string|number|null, name: string|number|null },]} data 
   */
  render(data, host) {
    let isThereAnError = false;

    try {
      const templateGalleryArea = CreateGallery.querySelector('#js-template-gallery');
      const clone = document.importNode(templateGalleryArea.content, true);
      document.body.appendChild(clone);
      
      switch (host) {
        case 'imgur':
          CreateGallery.imgurGallery(CreateGallery.sortData(data));
        break;

        default:
          CreateGallery.commonGallery(CreateGallery.sortData(data));
        break;
      }
      
      isThereAnError = true;
      
    } catch (error) {
      const msg = 'Não foi possível listar as imagens do album\n';
      throw new Error(msg + error.message);

    } finally {
      if (isThereAnError) {

        const timer = setInterval(() => {
          const isExistFunc = {
            masonry: typeof Masonry === 'function' ? true : false,
            lightGallery: typeof lightGallery === 'function' ? true : false,
            imagesLoaded: typeof imagesLoaded === 'function' ? true : false,
          }
  
          if (isExistFunc && isExistFunc && isExistFunc) {
            clearInterval(timer);
            // init light gallery
            CreateGallery.createLightGallery();
               
            const grid = CreateGallery.querySelector('.grid');        
            // check if image loaded before mount masonry
            imagesLoaded(grid).on('progress', (_, image) => {
              CreateGallery.createMasonry();
              image.img.classList.add('fade-in');
            });
            imagesLoaded(grid).on('done', () => {
              CreateGallery.hideLoading();
            });
          }
          
        }, 1000);

        CreateGallery.showLoading();
      }
    }
  }
}
