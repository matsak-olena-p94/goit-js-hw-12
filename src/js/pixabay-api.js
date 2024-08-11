import axios from 'axios';

const API_KEY = '45241203-3832c115afebf1441ca7c88b6';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });
  return response.data
} catch (error) {
    iziToast.error({
      position: "topRight",
        message: `${error}`,
    })
  }
}
