import {
	fetchArtworkData,
	fetchUniqueArtworks,
	fetchUniqueSearchResults,
} from '@/api/artworks';
import { getApiToken } from '@/api/artworks';
import { ArtworkResponse } from '@/types/artApi';
import { Artwork } from '@/types/artwork';
import { RootState } from '@/types/store';
import { ArtworkState } from '@/types/store';
import {
	getFavoriteIds,
	transformArtworkData,
	transformArtworks,
	transformSearchResults,
} from '@/utils/artworks';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtworks = createAsyncThunk(
	'artwork/fetchArtworks',
	async (page: number, { getState }): Promise<[Artwork[], string]> => {
		const state = getState() as RootState;
		const {
			artworks: storedArtworks,
			nextArtworksUrl: initialNextArtworksUrl,
			favorites,
		} = state.artworks;
		const storedArtworkIds = new Set(
			storedArtworks.map((artwork) => artwork.id)
		);
		const token = await getApiToken();

		const [data, nextArtworksUrl] = await fetchUniqueArtworks(
			token,
			storedArtworkIds,
			initialNextArtworksUrl
		);

		const favoriteIds = new Set(favorites.map((favorite) => favorite.id));
		const artworks = transformArtworks(
			data._embedded.artworks,
			favoriteIds,
			page
		);

		return [artworks, nextArtworksUrl];
	}
);

export const searchArtworks = createAsyncThunk(
	'artwork/searchArtworks',
	async (
		{ query, page }: { query?: string; page: number },
		{ getState }
	): Promise<[Artwork[], string]> => {
		const state = getState() as RootState;
		const {
			artworks: storedArtworks,
			nextArtworksUrl: initialNextArtworksUrl,
			favorites,
		} = state.artworks;
		const storedArtworkIds = new Set(
			storedArtworks.map((artwork) => artwork.id)
		);
		const token = await getApiToken();

		const [data, nextArtworksUrl] = await fetchUniqueSearchResults(
			token,
			storedArtworkIds,
			initialNextArtworksUrl,
			query
		);

		const favoriteIds = new Set(favorites.map((favorite) => favorite.id));
		const artworks = transformSearchResults(
			data._embedded.results,
			favoriteIds,
			page
		);

		return [artworks, nextArtworksUrl];
	}
);

export const fetchArtworkById = createAsyncThunk(
	'artwork/fetchArtworkById',
	async (id: string, { getState }) => {
		const token = await getApiToken();
		const response = await fetchArtworkData(id, token);

		if (!response.ok) {
			throw new Error('Failed to fetch artwork');
		}

		const data: ArtworkResponse = await response.json();
		const favoriteIds = getFavoriteIds(getState() as RootState);

		return transformArtworkData(data, favoriteIds);
	}
);

export const getArtworkById = (
	state: ArtworkState,
	id: string
): Artwork | undefined => {
	return (
		state.favorites.find((artwork: Artwork) => artwork.id === id) ||
		state.artworks.find((artwork: Artwork) => artwork.id === id) ||
		state.lastViewedArtwork
	);
};

export const setFavorite = createAction<{
	artwork: Artwork;
}>('artwork/setFavorite');

export const sortArtworksByTitleAsc = createAction(
	'artworks/sortArtworksByTitleAsc'
);
export const sortArtworksByTitleDesc = createAction(
	'artworks/sortArtworksByTitleDesc'
);