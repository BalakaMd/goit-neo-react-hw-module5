import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies('day', 1);
        setMovies(trendingMovies);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getMovies();
  }, []);

  return (
    <div>
      <h2>Today Trend Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
