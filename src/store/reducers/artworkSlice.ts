import {
	fetchArtworkById,
	fetchArtworks,
	searchArtworks,
	setFavorite,
	sortArtworksByTitleAsc,
	sortArtworksByTitleDesc,
} from '@/store/actions/artworks';
import { Status } from '@/types/api';
import { Artwork } from '@/types/artwork';
import { ArtworkState } from '@/types/store';
import { sortArtworks } from '@/utils/artworks';
import LocalStorageService from '@/utils/LocalStorageService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storedFavorites =
	LocalStorageService.getItem<Artwork[]>('favorites') || [];

const initialState: ArtworkState = {
	artworks: [],
	favorites: storedFavorites,
	searching: false,
	nextArtworksUrl: null,
	lastViewedArtwork: null,
	page: 1,
	status: Status.Idle,
	error: null,
};

export const artworkSlice = createSlice({
	name: 'artwork',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		resetNextArtworksUrl: (state) => {
			state.nextArtworksUrl = null;
		},
		resetLastViewedArtwork: (state) => {
			state.lastViewedArtwork = null;
		},
		clearArtworks: (state) => {
			state.artworks = [];
		},
		initiateNewSearch: (state) => {
			state.searching = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(setFavorite, (state, action) => {
				const artwork = action.payload.artwork;
				const foundArtwork = state.favorites.find(
					(art) => art.id === artwork.id
				);

				if (foundArtwork) {
					state.favorites = state.favorites.filter(
						(favorite) => favorite.id !== foundArtwork.id
					);
				} else {
					state.favorites.push(artwork);
				}
				LocalStorageService.setItem('favorites', state.favorites);
			})
			// cases for sorting artworks
			.addCase(sortArtworksByTitleAsc, (state) => {
				sortArtworks(state, (a, b) => a.title.localeCompare(b.title));
			})
			.addCase(sortArtworksByTitleDesc, (state) => {
				sortArtworks(state, (a, b) => b.title.localeCompare(a.title));
			})
			// cases for fetchArtworks
			.addCase(fetchArtworks.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(fetchArtworks.fulfilled, (state, action) => {
				const [newArtworks, nextArtworksUrl] = action.payload;
				state.status = Status.Succeeded;
				state.artworks = [...state.artworks, ...newArtworks];
				state.nextArtworksUrl = nextArtworksUrl;
			})
			.addCase(fetchArtworks.rejected, (state, action) => {
				state.status = Status.Failed;
				state.error = action.error.message;
			})
			// cases for searchArtworks
			.addCase(searchArtworks.pending, (state) => {
				state.status = Status.Loading;
				state.error = null;
			})
			.addCase(searchArtworks.fulfilled, (state, action) => {
				const [newArtworks, nextArtworksUrl] = action.payload;
				state.status = Status.Succeeded;
				state.artworks = [...state.artworks, ...newArtworks];
				state.nextArtworksUrl = nextArtworksUrl;
			})
			.addCase(searchArtworks.rejected, (state, action) => {
				state.status = Status.Failed;
				state.error = action.error.message || 'Failed to fetch artworks';
			})
			// cases for fetchArtworkById
			.addCase(fetchArtworkById.pending, (state) => {
				state.status = Status.Loading;
				state.error = null;
			})
			.addCase(
				fetchArtworkById.fulfilled,
				(state, action: PayloadAction<Artwork>) => {
					state.status = Status.Succeeded;
					state.lastViewedArtwork = action.payload;
				}
			)
			.addCase(fetchArtworkById.rejected, (state, action) => {
				state.status = Status.Failed;
				state.error = action.error.message || 'Failed to fetch artwork';
			});
	},
});

export const {
	initiateNewSearch,
	clearArtworks,
	resetNextArtworksUrl,
	resetLastViewedArtwork,
	setPage,
} = artworkSlice.actions;
export default artworkSlice.reducer;
