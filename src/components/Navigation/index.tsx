import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import BookmarkIcon from '@/assets/bookmark.svg';
import HomeIcon from '@/assets/home.svg';

export default function Navigation() {
	return (
		<nav className={styles.nav}>
			<Link to="/" className={`${styles.link} ${styles.home}`}>
				<HomeIcon />
				Home
			</Link>

			<Link to="/favorites" className={`${styles.link} ${styles.favorites}`}>
				<BookmarkIcon />
				Your favorites
			</Link>
		</nav>
	);
}
