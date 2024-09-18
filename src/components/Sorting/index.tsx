import { useDispatch } from 'react-redux';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

import styles from './styles.module.css';

import IconButton from '@/components/IconButton';
import {
	sortArtworksByTitleAsc,
	sortArtworksByTitleDesc,
} from '@/store/actions/artworks';
import { ArtworkCategory } from '@/types/artwork';
import { AppDispatch } from '@/types/store';

type SortingProps = {
	artworkCategory: ArtworkCategory;
};

export default function Sorting({ artworkCategory }: SortingProps) {
	const dispatch: AppDispatch = useDispatch();

	const handleSortByTitleAsc = () => {
		dispatch(sortArtworksByTitleAsc(artworkCategory));
	};

	const handleSortByTitleDesc = () => {
		dispatch(sortArtworksByTitleDesc(artworkCategory));
	};

	return (
		<div className={styles.sorting}>
			<p>Sort by title:</p>
			<IconButton onClick={handleSortByTitleAsc}>
				<ArrowDownAZ />
			</IconButton>
			<IconButton onClick={handleSortByTitleDesc}>
				<ArrowUpAZ />
			</IconButton>
		</div>
	);
}
