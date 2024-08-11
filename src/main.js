import { renderImages, clearGallery, showLoader, hideLoader } from './js/render-functions';
import fetchImages from './js/pixabay-api';
import iziToast from 'izitoast';

let currentPage = 1;
let currentQuery = '';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.classList.add('hidden');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const queryInput = event.currentTarget.elements.query;
  const query = queryInput.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(query, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      renderImages(data.hits);
      if (data.totalHits > currentPage * 15) {
        loadMoreBtn.classList.remove('hidden');
      }
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
    queryInput.value = '';
  }
});


// Event listener for Load More button
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);
    if (data.totalHits <= currentPage * 15) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();
  }
//   console.log('Total Hits:', data.totalHits);
// console.log('Current Page:', currentPage);
// console.log('Should show load more button:', data.totalHits > currentPage * 15);
});






