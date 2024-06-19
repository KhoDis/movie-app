import axios from 'axios';

const API_KEY = import.meta.env.VITE_KINOPOISK_API_KEY;
const BASE_URL = 'https://api.kinopoisk.dev/v1.4/movie';

export const fetchMovies = async (page = 1, filters = {}) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'X-API-KEY': API_KEY,
      },
      params: {
        page,
        limit: 50,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
