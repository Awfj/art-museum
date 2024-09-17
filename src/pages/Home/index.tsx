import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Gallery from '@/components/Gallery';
import LoadingScreen from '@/components/LoadingScreen';
import OtherWorks from '@/components/OtherWorks';
import Page from '@/components/Page';
import Search from '@/components/Search';
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
		if (artworks.length === 0) {
			dispatch(fetchArtworks(1));
		}
	}, [dispatch, artworks]);

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
