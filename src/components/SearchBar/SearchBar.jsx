import { useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';
import SearchIcon from '../SearchIcon/SearchIcon';

const SearchBar = ({ onSubmit, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = async e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a movie name');
      return;
    }
    try {
      onSubmit(query);
      setQuery('');
    } catch (error) {
      toast.error('Failed to search movies. Please try again.');
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          autoFocus
          placeholder="Search for movies"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          <SearchIcon className={styles.icon} />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
