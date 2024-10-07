import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { searchMovies } from '../../services/api';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSearchSubmit = useCallback(
    async searchQuery => {
      if (searchQuery.trim() === '') {
        setSearchParams({});
        setMovies([]);
        return;
      }
      setSearchParams({ query: searchQuery });
      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
      } catch (error) {
        console.error('Error searching movies:', error);
        toast.error('Failed to search movies. Please try again.');
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (query) {
      handleSearchSubmit(query);
    }
  }, [query, handleSearchSubmit]);

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} initialQuery={query} />
      <div>
        {movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : query ? (
          <p className={styles.moviesMessage}>
            No movies found. Try searching for a different movie!
          </p>
        ) : (
          <p className={styles.moviesMessage}>
            Search for a movie to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
