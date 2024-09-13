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
import { AppDispatch } from '@/types/store';
import { RootState } from '@/types/store';

export default function DetailInfo() {
	const goBack = useGoBack();
	const { id } = useParams<{ id: string }>();
	const dispatch: AppDispatch = useDispatch();
	const artwork = useSelector((state: RootState) =>
		getArtworkById(state.artworks, id)
	);
	const loading = useSelector(
		(state: RootState) => state.artworks.status === Status.Loading
	);
	const error = useSelector((state: RootState) => state.artworks.error);

	useEffect(() => {
		if (!artwork) {
			dispatch(fetchArtworkById(id));
		}
	}, [artwork, id, dispatch]);

	if (loading) {
		return <LoadingScreen />;
	}

	if (error) {
		throw new Error(error);
	}

	if (!artwork) {
		return null;
	}

	return (
		<Page>
			<div className={styles['detailes-info']}>
				<div className={styles['image-container']}>
					<img src={artwork.image} alt="" />
					<Bookmark floaty artwork={artwork} />
				</div>

				<div className={styles.details}>
					<section className={styles.info}>
						<h2>{artwork.title}</h2>
						<p className={styles.artist}>{artwork.artist}</p>
						<p className={styles.date}>{artwork.date}</p>
					</section>

					<section className={styles.overview}>
						<h2>Overview</h2>
						<p>
							<span>Medium:</span> {artwork.medium}
						</p>
						<p>
							<span>Dimensions Sheet:</span> {artwork.dimensions}
						</p>
						{artwork.repository && (
							<p>
								<span>Repository:</span> {artwork.repository}
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
