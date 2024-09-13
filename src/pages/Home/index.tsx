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
	const error = useSelector((state: RootState) => state.artworks.error);

	useEffect(() => {
		if (status === Status.Idle) {
			dispatch(fetchArtworks());
		}
	}, [status, dispatch]);

	if (status === Status.Loading) {
		return <LoadingScreen />;
	}

	if (status === Status.Failed) {
		return <div>Error: {error}</div>;
	}

	return (
		<Page verticalContent>
			<Search />
			<Gallery />
			<OtherWorks />
		</Page>
	);
}
