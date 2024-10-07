import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        setIsLoading(true);
        const castData = await fetchMovieCredits(movieId);
        setCast(castData.cast);
      } catch (error) {
        setError('Failed to fetch cast information');
        console.error('Error fetching cast:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (isLoading) return <div>Loading cast...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.castContainer}>
      {cast.length > 0 ? (
        cast.map(actor => (
          <div key={actor.id} className={styles.actorCard}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : '/placeholder.jpg'
              }
              alt={actor.name}
              className={styles.actorImage}
            />
            <h3 className={styles.actorName}>{actor.name}</h3>
            <p className={styles.character}>Character: {actor.character}</p>
          </div>
        ))
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
