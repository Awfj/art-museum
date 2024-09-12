import { useSelector } from 'react-redux';

import CardsList from '@/components/CardsList';
import ContentHeading from '@/components/ContentHeading';
import { RootState } from '@/types/store';

export default function FavoritesList() {
	const favorites = useSelector((state: RootState) => state.artworks.favorites);

	return (
		<section>
			<ContentHeading
				heading={'Your favorites list'}
				description={'Saved by you'}
			/>
			<CardsList artworks={favorites} />
		</section>
	);
}
