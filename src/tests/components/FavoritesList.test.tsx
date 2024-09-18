import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import FavoritesList from '@/components/FavoritesList';
import { Status } from '@/types/api';
import { RootState } from '@/types/store';
import { render, screen } from '@testing-library/react';

const mockStore = configureStore<RootState>([]);

describe('FavoritesList', () => {
	it('should display heading and description', () => {
		const initialState = {
			app: {
				menuOpen: false,
				mobile: false,
			},
			artworks: {
				favorites: [],
				artworks: [],
				otherWorks: [],
				searching: false,
				nextArtworksUrl: null,
				previousArtworksUrl: null,
				loading: false,
				lastViewedArtwork: null,
				page: 1,
				status: 'idle' as Status,
			},
		};
		const store = mockStore(initialState);

		render(
			<Provider store={store}>
				<FavoritesList />
			</Provider>
		);

		expect(screen.getByText('Your favorites list')).toBeInTheDocument();
		expect(screen.getByText('Saved by you')).toBeInTheDocument();
	});

	it('should show a message when there are no favorite artworks', () => {
		const initialState = {
			app: {
				menuOpen: false,
				mobile: false,
			},
			artworks: {
				favorites: [],
				artworks: [],
				otherWorks: [],
				searching: false,
				nextArtworksUrl: null,
				previousArtworksUrl: null,
				loading: false,
				lastViewedArtwork: null,
				page: 1,
				status: 'idle' as Status,
			},
		};
		const store = mockStore(initialState);

		render(
			<Provider store={store}>
				<FavoritesList />
			</Provider>
		);

		expect(
			screen.getByText("You don't have favorite artworks yet")
		).toBeInTheDocument();
	});
});
