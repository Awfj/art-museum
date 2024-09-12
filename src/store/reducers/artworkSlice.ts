import {
	fetchArtworkById,
	fetchArtworks,
	searchArtworks,
} from '@/store/actions/artworks';
import { Status } from '@/types/api';
import { Artwork } from '@/types/artwork';
import { ArtworkState } from '@/types/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

const initialState: ArtworkState = {
	artworks: storedFavorites,
	favorites: storedFavorites,
	status: Status.Idle,
	error: null,
};

export const artworkSlice = createSlice({
	name: 'artwork',
	initialState,
	reducers: {
		setFavorite: (state, action: PayloadAction<{ artwork: Artwork }>) => {
			const artwork = action.payload.artwork;
			const foundArtwork = state.artworks.find((art) => art.id === artwork.id);

			if (foundArtwork) {
				if (artwork.favorite) {
					foundArtwork.favorite = false;
					state.favorites = state.favorites.filter(
						(favorite) => favorite.id !== foundArtwork.id
					);
				} else {
					foundArtwork.favorite = true;
					state.favorites.push(foundArtwork);
				}
				localStorage.setItem('favorites', JSON.stringify(state.favorites));
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// cases for fetchArtworks
			.addCase(fetchArtworks.pending, (state) => {
				state.status = Status.Loading;
			})
			.addCase(fetchArtworks.fulfilled, (state, action) => {
				state.status = Status.Succeeded;
				state.artworks = action.payload;
				// set favorite property to true for favorite artworks
				state.artworks.forEach((artwork) => {
					const isFavorite = state.favorites.some(
						(favorite) => favorite.id === artwork.id
					);
					if (isFavorite) {
						artwork.favorite = true;
					}
				});
				// for correct toggle of favorites
				state.artworks = [...state.artworks, ...state.favorites];
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
			.addCase(
				searchArtworks.fulfilled,
				(state, action: PayloadAction<Artwork[]>) => {
					state.status = Status.Succeeded;
					state.artworks = [...action.payload, ...state.favorites];
				}
			)
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
					state.artworks = [action.payload, ...state.artworks.slice(1)];
				}
			)
			.addCase(fetchArtworkById.rejected, (state, action) => {
				state.status = Status.Failed;
				state.error = action.error.message || 'Failed to fetch artwork';
			});
	},
});

export default artworkSlice.reducer;
