import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Gallery from '@/components/Gallery';
import LoadingScreen from '@/components/LoadingScreen';
import OtherWorks from '@/components/OtherWorks';
import Page from '@/components/Page';
import Search from '@/components/Search';
import { INITIAL_PAGE } from '@/constants/artworks';
import { fetchArtworks } from '@/store/actions/artworks';
import { Status } from '@/types/api';
import { AppDispatch, RootState } from '@/types/store';

export default function Home() {
	const dispatch: AppDispatch = useDispatch();
	const status = useSelector((state: RootState) => state.artworks.status);
	const artworks = useSelector((state: RootState) => state.artworks.artworks);
	const error = useSelector((state: RootState) => state.artworks.error);
	const searching = useSelector((state: RootState) => state.artworks.searching);

	useEffect(() => {
		if (!searching && artworks.length === 0) {
			dispatch(fetchArtworks(INITIAL_PAGE));
		}
	}, [dispatch, artworks, searching]);

	if (status === Status.Loading && !searching && artworks.length === 0) {
		return <LoadingScreen />;
	}

	if (status === Status.Failed) {
		throw new Error(error);
	}

	return (
		<Page verticalContent>
			<Search />
			<Gallery />
			<OtherWorks />
		</Page>
	);
}
