import styles from './styles.module.css';

import BookmarkIcon from '@/assets/bookmark.svg';
import FavoritesList from '@/components/FavoritesList';
import Page from '@/components/Page';
import PageHeading from '@/components/PageHeading';

export default function Favorites() {
	return (
		<Page verticalContent>
			<PageHeading centered>
				here are your
				<br />
				<span className={styles['word-emphasis']}>
					<BookmarkIcon />
					favorites
				</span>
			</PageHeading>

			<FavoritesList />
		</Page>
	);
}
