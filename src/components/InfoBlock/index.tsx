import styles from './styles.module.css';

import Bookmark from '@/components/Bookmark';
import { Artwork } from '@/types/artwork';

type InfoBlockProps = {
	artwork: Artwork;
	fixed?: boolean;
};

export default function InfoBlock({ artwork, fixed = true }: InfoBlockProps) {
	return (
		<div
			className={`${styles['info-block']} ${fixed ? styles.fixed : styles.floaty}`}
		>
			<div className={styles.info}>
				<p className={styles.title}>{artwork.title}</p>
				<p className={styles.artist}>{artwork.artist}</p>
				<p className={styles['domain-type']}>{artwork.domainType}</p>
			</div>

			<Bookmark artwork={artwork} />
		</div>
	);
}
