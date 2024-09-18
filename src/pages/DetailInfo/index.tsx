import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './styles.module.css';

import Bookmark from '@/components/Bookmark';
import LoadingScreen from '@/components/LoadingScreen';
import Page from '@/components/Page';
import TextButton from '@/components/TextButton';
import useGoBack from '@/hooks/useGoBack';
import { fetchArtworkById, getArtworkById } from '@/store/actions/artworks';
import { Status } from '@/types/api';
import { Artwork } from '@/types/artwork';
import { AppDispatch } from '@/types/store';
import { RootState } from '@/types/store';
import LocalStorageService from '@/utils/LocalStorageService';

export default function DetailInfo() {
	const goBack = useGoBack();
	const { id } = useParams<{ id: string }>();
	const dispatch: AppDispatch = useDispatch();
	const cachedArtwork: Artwork = LocalStorageService.getItem(`artwork_${id}`);
	const artwork = useSelector((state: RootState) =>
		getArtworkById(state.artworks, encodeURIComponent(id))
	);

	const loading = useSelector(
		(state: RootState) => state.artworks.status === Status.Loading
	);
	const error = useSelector((state: RootState) => state.artworks.error);

	useEffect(() => {
		if (!artwork && !cachedArtwork) {
			dispatch(fetchArtworkById(id));
		} else if (artwork) {
			LocalStorageService.setItem(`artwork_${id}`, artwork);
		}
		return () => {
			LocalStorageService.removeItem(`artwork_${id}`);
		};
	}, [artwork, cachedArtwork, id, dispatch]);

	if (loading && !cachedArtwork) {
		return <LoadingScreen />;
	}

	if (error) {
		throw new Error(error);
	}

	if (!artwork && !cachedArtwork) {
		return null;
	}

	const displayArtwork = artwork || cachedArtwork;

	return (
		<Page>
			<div className={styles['detailes-info']}>
				<div className={styles['image-container']}>
					<img src={displayArtwork.image} alt="" />
					<Bookmark floaty artwork={displayArtwork} />
				</div>

				<div className={styles.details}>
					<section className={styles.info}>
						<h2>{displayArtwork.title}</h2>
						<p className={styles.artist}>{displayArtwork.artist}</p>
						<p className={styles.date}>{displayArtwork.date}</p>
					</section>

					<section className={styles.overview}>
						<h2>Overview</h2>
						<p>
							<span>Medium:</span> {displayArtwork.medium}
						</p>
						<p>
							<span>Dimensions Sheet:</span> {displayArtwork.dimensions}
						</p>
						{displayArtwork.repository && (
							<p>
								<span>Repository:</span> {displayArtwork.repository}
							</p>
						)}
						<p>Public</p>
						<TextButton onClick={goBack}>Go Back</TextButton>
					</section>
				</div>
			</div>
		</Page>
	);
}
