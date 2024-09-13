import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

import styles from './styles.module.css';

import Card from '@/components/Card';
import ContentHeading from '@/components/ContentHeading';
import IconButton from '@/components/IconButton';
import Pagination from '@/components/Pagination';
import { ARTWORKS_IN_GALLERY, ARTWORKS_PER_PAGE } from '@/constants/artworks';
import {
	sortArtworksByTitleAsc,
	sortArtworksByTitleDesc,
} from '@/store/actions/artworks';
import { Artwork } from '@/types/artwork';
import { RootState } from '@/types/store';
import { AppDispatch } from '@/types/store';

export default function Gallery() {
	const [artworksPerPage, setArtworksPerPage] = useState(ARTWORKS_PER_PAGE);
	const contentHeadingRef = useRef<HTMLDivElement>(null);
	const [userInitiated, setUserInitiated] = useState(false);

	const dispatch: AppDispatch = useDispatch();
	const favoritesCount = useSelector(
		(state: RootState) => state.artworks.favorites
	).length;
	const artworks = useSelector((state: RootState) => state.artworks.artworks)
		.slice(0, -favoritesCount)
		.slice(0, ARTWORKS_IN_GALLERY);
	const [currentPage, setCurrentPage] = useState(1);

	const lastWorkIndex = currentPage * artworksPerPage;
	const firstWorkIndex = lastWorkIndex - artworksPerPage;
	const currentWorks = artworks.slice(firstWorkIndex, lastWorkIndex);

	const handlePageChange = (pageNumber: number) => {
		setUserInitiated(true);
		setCurrentPage(pageNumber);
	};

	const handleSortByTitleAsc = () => {
		dispatch(sortArtworksByTitleAsc());
	};

	const handleSortByTitleDesc = () => {
		dispatch(sortArtworksByTitleDesc());
	};

	useEffect(() => {
		const handleResize = () => {
			const newArtworksPerPage =
				window.innerWidth > 640 && window.innerWidth <= 960
					? ARTWORKS_PER_PAGE - 1
					: ARTWORKS_PER_PAGE;

			if (newArtworksPerPage !== artworksPerPage) {
				setArtworksPerPage(newArtworksPerPage);
				setCurrentPage(1);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [artworksPerPage]);

	useEffect(() => {
		if (
			userInitiated &&
			window.innerWidth <= 640 &&
			contentHeadingRef.current
		) {
			contentHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setUserInitiated(false);
		}
	}, [currentPage, userInitiated]);

	if (artworks.length === 0) {
		return null;
	}

	return (
		<section ref={contentHeadingRef}>
			<ContentHeading
				heading={'Our special gallery'}
				description={'Topics for you'}
			/>

			<div className={`${styles.cards}`}>
				{currentWorks.map((artwork: Artwork) => (
					<Card key={artwork.id} artwork={artwork} />
				))}
			</div>

			<footer className={styles.footer}>
				<div className={styles.sorting}>
					<p>Sort by title:</p>
					<IconButton onClick={handleSortByTitleAsc}>
						<ArrowDownAZ />
					</IconButton>
					<IconButton onClick={handleSortByTitleDesc}>
						<ArrowUpAZ />
					</IconButton>
				</div>
				<Pagination
					length={Math.ceil(artworks.length / artworksPerPage)}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</footer>
		</section>
	);
}
