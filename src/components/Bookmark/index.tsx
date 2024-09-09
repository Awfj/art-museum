import styles from './styles.module.css';

import BookmarkIcon from '@/assets/bookmark.svg';

type BookmarkProps = {
	floaty?: boolean;
};

export default function Bookmark({ floaty }: BookmarkProps) {
	return (
		<button className={`${styles.bookmark} ${floaty ? styles.floaty : ''}`}>
			<BookmarkIcon />
		</button>
	);
}
