import {
	ARTWORKS_PER_PAGE,
	INITIAL_PAGE,
	OTHER_WORKS_COUNT,
} from '@/constants/artworks';
import {
	fetchArtworkById,
	fetchArtworks,
	searchArtworks,
	setFavorite,
	sortArtworksByTitleAsc,
	sortArtworksByTitleDesc,
} from '@/store/actions/artworks';
import { Status } from '@/types/api';
import { Artwork, ArtworkCategory } from '@/types/artwork';
import { ArtworkState } from '@/types/store';
import { sortArtworks } from '@/utils/artworks';
import LocalStorageService from '@/utils/LocalStorageService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storedFavorites =
	LocalStorageService.getItem<Artwork[]>('favorites') || [];

const initialState: ArtworkState = {
	artworks: [],
	favorites: storedFavorites,
	otherWorks: [],
	searching: false,
	nextArtworksUrl: null,
	lastViewedArtwork: null,
	page: INITIAL_PAGE,
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
			.addCase(sortArtworksByTitleAsc, (state, action) => {
				const compareFn = (a: Artwork, b: Artwork) =>
					a.title.localeCompare(b.title);

				switch (action.payload) {
					case ArtworkCategory.Gallery:
						sortArtworks(state, compareFn);
						break;
					case ArtworkCategory.OtherWorks:
						state.otherWorks.sort(compareFn);
						break;
					case ArtworkCategory.Favorites:
						state.favorites.sort(compareFn);
						break;
				}
			})
			.addCase(sortArtworksByTitleDesc, (state, action) => {
				const compareFn = (a: Artwork, b: Artwork) =>
					b.title.localeCompare(a.title);
				switch (action.payload) {
					case ArtworkCategory.Gallery:
						sortArtworks(state, compareFn);
						break;
					case ArtworkCategory.OtherWorks:
						state.otherWorks.sort(compareFn);
						break;
					case ArtworkCategory.Favorites:
						state.favorites.sort(compareFn);
						break;
				}
			})
			// cases for fetchArtworks
			.addCase(fetchArtworks.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(fetchArtworks.fulfilled, (state, action) => {
				const [newArtworks, nextArtworksUrl] = action.payload;
				state.status = Status.Succeeded;

				if (newArtworks.length > ARTWORKS_PER_PAGE) {
					state.otherWorks = newArtworks.slice(0, OTHER_WORKS_COUNT);
					state.artworks = newArtworks.slice(OTHER_WORKS_COUNT);
				} else {
					state.artworks = [...state.artworks, ...newArtworks];
				}

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
