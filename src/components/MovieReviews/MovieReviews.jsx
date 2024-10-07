import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData.results);
      } catch (error) {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.reviewsContainer}>
      <h3>Movie Reviews</h3>
      {reviews.length > 0 ? (
        <ul className={styles.reviewList}>
          {reviews.map(review => (
            <li key={review.id} className={styles.reviewItem}>
              <h4 className={styles.author}>{review.author}</h4>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
