import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.css';

import BookmarkIcon from '@/assets/bookmark.svg';
import { setFavorite } from '@/store/actions/artworks';
import { Artwork } from '@/types/artwork';
import { RootState } from '@/types/store';

type BookmarkProps = {
	floaty?: boolean;
	artwork: Artwork;
};

export default function Bookmark({ artwork, floaty }: BookmarkProps) {
	const dispatch = useDispatch();
	const favorites = useSelector((state: RootState) => state.artworks.favorites);

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		dispatch(setFavorite({ artwork }));
	}

	const favorite = favorites.some((favorite) => favorite.id === artwork.id);

	return (
		<button
			onClick={handleClick}
			className={`${styles.bookmark} ${favorite ? styles.favorite : ''} ${floaty ? styles.floaty : ''}`}
		>
			<BookmarkIcon />
		</button>
	);
}
