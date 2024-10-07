import axios from 'axios';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2QxYjJmOTUxYjZlNTE0OTA0Y2NhYjEyNjdkYmUwMSIsIm5iZiI6MTcyODI0MzM4Mi43MTc2MjksInN1YiI6IjY1MTFkMmY2NjhmZjcwMDEwMDcwNWJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lyI0lv06ERwXpui8-UnZLIvDtGO1an6Y8Y1Yz0r8Fbg';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async (timeWindow = 'week', page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/${timeWindow}`,
      {
        params: {
          language: 'en-US',
          page: page,
        },
        headers: {
          Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: page,
      },
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovie = async movieId => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};

// In src/services/api.js

export const fetchMovieCredits = async movieId => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const fetchMovieReviews = async movieId => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};
