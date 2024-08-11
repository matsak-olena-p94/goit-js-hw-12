import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox(".gallery a" , { 
           captions: true,
           captionsData: 'alt',
           captionDelay: 250
        });

export function renderImages(images) {
    const markup = images
      .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
          <a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p><b>Likes:</b> ${likes}</p>
              <p><b>Views:</b> ${views}</p>
              <p><b>Comments:</b> ${comments}</p>
              <p><b>Downloads:</b> ${downloads}</p>
            </div>
          </a>`;
      })
      .join('');
  
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }

  export function clearGallery() {
    gallery.innerHTML = '';
  }

  export function showLoader() {
    document.querySelector('.loader').classList.remove('hidden');
  }
  
  export function hideLoader() {
    document.querySelector('.loader').classList.add('hidden');
  }
  