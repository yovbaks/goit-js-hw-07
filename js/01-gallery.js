import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
//  Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

const cardsMarkup = createMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="large-image.jpg">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>
    `;
    })
    .join('');
}
// Відкриття модалки

const onClickOpenModal = event => {
  event.preventDefault();
  const source = event.target.dataset.source;
  const intense = basicLightbox.create(
    `
		<img
      class="gallery__image"
      src="${source}"
      data-source="${source}"
      alt="${event.alt}"
			width="800"
      height="600"
    />
		`,
    {
      onShow: intense => {
        window.addEventListener('keydown', onEscPress);
      },
      onClose: intense => {
        window.removeEventListener('keydown', onEscPress);
      }
    }
  );

  const onEscPress = event => {
    if (event.code === 'Escape') {
      intense.close();
    }
  };

  intense.show();
};

galleryContainer.addEventListener('click', onClickOpenModal);
