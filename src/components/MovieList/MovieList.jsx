import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      {movies.map(movie => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          state={{ from: location }}
          className={styles.movieItem}
        >
          <p className={styles.movieTitle}>{movie.title}</p>
        </Link>
      ))}
    </>
  );
};

export default MovieList;
