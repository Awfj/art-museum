import { useSelector } from 'react-redux';

import CardsList from '@/components/CardsList';
import ContentHeading from '@/components/ContentHeading';
import ControllerContainer from '@/components/ControllerContainer';
import Sorting from '@/components/Sorting';
import { ArtworkCategory } from '@/types/artwork';
import { RootState } from '@/types/store';

export default function OtherWorks() {
	const artworks = useSelector((state: RootState) => state.artworks.otherWorks);

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

			<ControllerContainer>
				<Sorting artworkCategory={ArtworkCategory.OtherWorks} />
			</ControllerContainer>
		</section>
	);
}
