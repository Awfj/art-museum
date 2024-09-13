import { useSelector } from 'react-redux';

import CardsList from '@/components/CardsList';
import ContentHeading from '@/components/ContentHeading';
import { ARTWORKS_IN_GALLERY, ARTWORKS_TOTAL } from '@/constants/artworks';
import { RootState } from '@/types/store';

export default function OtherWorks() {
	const favorites = useSelector(
		(state: RootState) => state.artworks.favorites
	);
	let artworks = useSelector((state: RootState) => state.artworks.artworks);
	if (favorites.length > 0) {
		artworks = artworks.slice(0, -favorites.length);
	}
	artworks = artworks.slice(ARTWORKS_IN_GALLERY, ARTWORKS_TOTAL);
	if (artworks.length === 0) {
		artworks = favorites;
	}

	if (artworks.length === 0) {
		return null;
	}

	return (
		<section>
			<ContentHeading
				heading={'Other works for you'}
				description={'Here some more'}
			/>
			<CardsList artworks={artworks} />
		</section>
	);
}
