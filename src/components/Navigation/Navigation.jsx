import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink to="/" className={styles.link} end>
          Home
        </NavLink>
        <NavLink to="/movies" className={styles.link}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
