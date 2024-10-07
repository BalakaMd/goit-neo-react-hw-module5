import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovie } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const response = await fetchMovie(movieId);
      setMovie(response);
    };
    getMovie();

    setPreviousLocation(location.state?.from || '/movies');
  }, [movieId, location.state]);

  const handleGoBack = () => {
    navigate(previousLocation);
  };

  const getRatingColor = rating => {
    if (rating >= 7) return styles.highRating;
    if (rating >= 5) return styles.mediumRating;
    return styles.lowRating;
  };

  return (
    <div className={styles.pageContainer}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go back
      </button>
      <div className={styles.movieContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.rating}>
            Rating:{' '}
            <span className={getRatingColor(movie.vote_average)}>
              {movie.vote_average}
            </span>
          </p>
          <p className={styles.releaseDate}>
            Release Date: {movie.release_date}
          </p>
          <p className={styles.overview}>Overview: {movie.overview}</p>
          <h3>Additional Information</h3>
          <div>
            <Link
              to={`/movies/${movieId}/cast`}
              state={{ from: location.state?.from }}
              className={styles.infoLink}
            >
              Cast
            </Link>
            <Link
              to={`/movies/${movieId}/reviews`}
              state={{ from: location.state?.from }}
              className={styles.infoLink}
            >
              Reviews
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
