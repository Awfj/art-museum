import styles from './styles.module.css';

import Card from '@/components/Card';
import { CardSize } from '@/types/app';
import { Artwork } from '@/types/artwork';

type CardsListProps = {
	artworks: Artwork[];
};

export default function CardsList({ artworks }: CardsListProps) {
	return (
		<div className={styles['cards-list']}>
			{artworks.map((artwork: Artwork) => (
				<Card key={artwork.id} artwork={artwork} size={CardSize.Small} />
			))}
		</div>
	);
}
