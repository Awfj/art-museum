import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.css';

import Card from '@/components/Card';
import ContentHeading from '@/components/ContentHeading';
import ControllerContainer from '@/components/ControllerContainer';
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import Sorting from '@/components/Sorting';
import { ARTWORKS_PER_PAGE } from '@/constants/artworks';
import { fetchArtworks, searchArtworks } from '@/store/actions/artworks';
import { setPage } from '@/store/reducers/artworkSlice';
import { Status } from '@/types/api';
import { Artwork } from '@/types/artwork';
import { ArtworkCategory } from '@/types/artwork';
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

	const firstIndex = useMemo(
		() => artworks.findIndex((artwork) => artwork.page === page),
		[artworks, page]
	);
	const currentWorks = useMemo(
		() => artworks.slice(firstIndex, firstIndex + 3),
		[artworks, firstIndex]
	);

	const handlePageChange = useCallback(
		(pageNumber: number) => {
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
		},
		[status, artworks, searching, dispatch]
	);

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

	return (
		<section ref={contentHeadingRef}>
			<ContentHeading
				heading={'Our special gallery'}
				description={'Topics for you'}
			/>

			{artworks.length === 0 || status === Status.Loading ? (
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
			<ControllerContainer>
				<Sorting artworkCategory={ArtworkCategory.Gallery} />
				<Pagination currentPage={page} onPageChange={handlePageChange} />
			</ControllerContainer>
		</section>
	);
}
