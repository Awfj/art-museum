import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import BookmarkIcon from '@/assets/bookmark.svg';
import HomeIcon from '@/assets/home.svg';
import { ROUTE_PATHS } from '@/constants/routePaths';

export default function Navigation() {
	return (
		<nav className={styles.nav}>
			<Link to={ROUTE_PATHS.HOME} className={`${styles.link} ${styles.home}`}>
				<HomeIcon />
				Home
			</Link>

			<Link
				to={ROUTE_PATHS.FAVORITES}
				className={`${styles.link} ${styles.favorites}`}
			>
				<BookmarkIcon />
				Your favorites
			</Link>
		</nav>
	);
}
