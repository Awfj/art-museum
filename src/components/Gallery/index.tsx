import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

import styles from './styles.module.css';

import Card from '@/components/Card';
import ContentHeading from '@/components/ContentHeading';
import IconButton from '@/components/IconButton';
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import { ARTWORKS_PER_PAGE } from '@/constants/artworks';
import {
	fetchArtworks,
	searchArtworks,
	sortArtworksByTitleAsc,
	sortArtworksByTitleDesc,
} from '@/store/actions/artworks';
import { setPage } from '@/store/reducers/artworkSlice';
import { Status } from '@/types/api';
import { Artwork } from '@/types/artwork';
import { AppDispatch, RootState } from '@/types/store';

export default function Gallery() {
	const [artworksPerPage, setArtworksPerPage] = useState(ARTWORKS_PER_PAGE);
	const contentHeadingRef = useRef<HTMLDivElement>(null);
	const [userInitiated, setUserInitiated] = useState(false);

	const status = useSelector((state: RootState) => state.artworks.status);
	const searching = useSelector((state: RootState) => state.artworks.searching);

	const dispatch: AppDispatch = useDispatch();
	const artworks = useSelector((state: RootState) => state.artworks.artworks);
	const page = useSelector((state: RootState) => state.artworks.page);
	const firstIndex = artworks.findIndex((artwork) => {
		return artwork.page === page;
	});
	const currentWorks = artworks.slice(firstIndex, firstIndex + 3);

	const handlePageChange = (pageNumber: number) => {
		if (status === Status.Succeeded) {
			if (!artworks.some((artwork) => artwork.page === pageNumber)) {
				if (searching) {
					dispatch(searchArtworks({ page: pageNumber }));
				} else {
					dispatch(fetchArtworks(pageNumber));
				}
			}
		}

		setUserInitiated(true);
		dispatch(setPage(pageNumber));
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
				dispatch(setPage(1));
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [artworksPerPage, dispatch]);

	useEffect(() => {
		if (
			userInitiated &&
			window.innerWidth <= 640 &&
			contentHeadingRef.current
		) {
			contentHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
			setUserInitiated(false);
		}
	}, [userInitiated]);

	if (artworks.length === 0) {
		return null;
	}

	return (
		<section ref={contentHeadingRef}>
			<ContentHeading
				heading={'Our special gallery'}
				description={'Topics for you'}
			/>

			{status === Status.Loading ? (
				<div className={styles.loader}>
					<Loader />
				</div>
			) : (
				<div className={`${styles.cards}`}>
					{currentWorks.map((artwork: Artwork) => (
						<Card key={artwork.id} artwork={artwork} />
					))}
				</div>
			)}

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
				<Pagination currentPage={page} onPageChange={handlePageChange} />
			</footer>
		</section>
	);
}
