import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const galleryMarkup = galleryItems.map(({ preview, original, description }) => 
`<li class="gallery__item">
<a class="gallery__link" href="${original}">
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</li>`);

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup.join(''));

galleryEl.addEventListener('click', onClick);

function onClick(event) {
    event.preventDefault();
  
    const { target } = event;
  
    if (!target.classList.contains('gallery__image')) {
      return;
    }
  
    const targetImageSrc = target.dataset.source;
  
    if (targetImageSrc) {
      const imageOriginal = basicLightbox.create(
        `<img src="${targetImageSrc}" width="1280" height="auto">`,
        {
          onShow: () => {
            document.addEventListener('keydown', onPressEsc);
            bodyScrollLock();
          },
          onClose: () => {
            document.removeEventListener('keydown', onPressEsc);
            bodyScrollUnlock();
          },
        }
      );
  
      imageOriginal.show();
  
      imageOriginal.element().addEventListener('click', () => {
        imageOriginal.close();
      });
  
      function onPressEsc(event) {
        if (event.code !== 'Escape') {
          return;
        }
        imageOriginal.close();
      }
    }
  }
  
  function bodyScrollLock() {
    document.body.style.overflow = 'hidden';
  }
  
  function bodyScrollUnlock() {
    document.body.style.overflow = 'auto';
  }