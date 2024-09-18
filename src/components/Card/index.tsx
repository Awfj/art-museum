import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';

import NoImage from '@/assets/no-image.png';
import InfoBlock from '@/components/InfoBlock';
import { ROUTE_PATHS } from '@/constants/routePaths';
import { CardSize } from '@/types/app';
import { Artwork } from '@/types/artwork';

type CardProps = {
	artwork: Artwork;
	size?: CardSize;
};

export default function Card({ artwork, size = CardSize.Normal }: CardProps) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(ROUTE_PATHS.ARTWORK.getDetailInfoPath(artwork.id));
	};

	return (
		<>
			{artwork && (
				<div
					onClick={handleClick}
					className={`${size === CardSize.Normal ? styles.normal : styles.small}`}
				>
					{artwork.image || artwork.thumbnail ? (
						<img
							src={size === CardSize.Normal ? artwork.image : artwork.thumbnail}
							alt={artwork.title}
						/>
					) : (
						<img src={NoImage} alt={artwork.title} />
					)}
					<InfoBlock artwork={artwork} fixed={size === CardSize.Small} />
				</div>
			)}
		</>
	);
}
