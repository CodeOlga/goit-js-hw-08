// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryList = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
galleryList.addEventListener('click', onGalleryListClick);

//render markup based on data array
function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}

function onGalleryListClick(e) {
  //disable page reload
  e.preventDefault();

  //disable click not on img
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  // searching by class
  //   if (!e.target.classList.contains('gallery__image')) {
  //     return;
  //   }

  //big img access
  const selectedImg = e.target.dataset.source;

  //library
  const instance = basicLightbox.create(
    `<img src="${selectedImg}" width="800" height="600"/>`,
    {
      onShow: instance => {
        window.addEventListener('keydown', closeByEsc);
      },
      onClose: instance => {
        window.removeEventListener('keydown', closeByEsc);
      },
    }
  );

  instance.show();

  function closeByEsc({ code }) {
    if (code === 'Escape') {
      instance.close();
    }
  }
}

console.log(galleryItems);
