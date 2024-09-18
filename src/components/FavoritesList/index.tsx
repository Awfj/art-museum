import { useSelector } from 'react-redux';

import styles from './styles.module.css';

import CardsList from '@/components/CardsList';
import ContentHeading from '@/components/ContentHeading';
import ControllerContainer from '@/components/ControllerContainer';
import Sorting from '@/components/Sorting';
import { ArtworkCategory } from '@/types/artwork';
import { RootState } from '@/types/store';

export default function FavoritesList() {
	const favorites = useSelector((state: RootState) => state.artworks.favorites);

	return (
		<section>
			<ContentHeading
				heading={'Your favorites list'}
				description={'Saved by you'}
			/>

			{favorites.length > 0 ? (
				<>
					<CardsList artworks={favorites} />
					<ControllerContainer>
						<Sorting artworkCategory={ArtworkCategory.Favorites} />
					</ControllerContainer>
				</>
			) : (
				<p className={styles.message}>You don't have favorite artworks yet</p>
			)}
		</section>
	);
}
