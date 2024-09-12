import { useDispatch } from 'react-redux';

import styles from './styles.module.css';

import BookmarkIcon from '@/assets/bookmark.svg';
import { setFavorite } from '@/store/actions/artworks';
import { Artwork } from '@/types/artwork';

type BookmarkProps = {
	floaty?: boolean;
	artwork: Artwork;
};

export default function Bookmark({ artwork, floaty }: BookmarkProps) {
	const dispatch = useDispatch();

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		dispatch(setFavorite({ artwork }));
	}

	return (
		<button
			onClick={handleClick}
			className={`${styles.bookmark} ${artwork.favorite ? styles.favorite : ''} ${floaty ? styles.floaty : ''}`}
		>
			<BookmarkIcon />
		</button>
	);
}
