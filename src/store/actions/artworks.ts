import {
	fetchArtworkData,
	fetchUniqueArtworks,
	fetchUniqueSearchResults,
} from '@/api/artworks';
import { getApiToken } from '@/api/artworks';
import { ArtworkResponse } from '@/types/artApi';
import { Artwork, ArtworkCategory } from '@/types/artwork';
import { RootState } from '@/types/store';
import { ArtworkState } from '@/types/store';
import {
	transformArtworkData,
	transformArtworks,
	transformSearchResults,
} from '@/utils/artworks';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtworks = createAsyncThunk(
	'artwork/fetchArtworks',
	async (page: number, { getState }): Promise<[Artwork[], string]> => {
		try {
			const state = getState() as RootState;
			const {
				artworks: storedArtworks,
				nextArtworksUrl: initialNextArtworksUrl,
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

			const artworks = transformArtworks(data._embedded.artworks, page);

			return [artworks, nextArtworksUrl];
		} catch (error) {
			throw new Error(`Error fetching artworks: ${error.message}`);
		}
	}
);

export const searchArtworks = createAsyncThunk(
	'artwork/searchArtworks',
	async (
		{ query, page }: { query?: string; page: number },
		{ getState }
	): Promise<[Artwork[], string]> => {
		try {
			const state = getState() as RootState;
			const {
				artworks: storedArtworks,
				nextArtworksUrl: initialNextArtworksUrl,
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

			const artworks = transformSearchResults(data._embedded.results, page);

			return [artworks, nextArtworksUrl];
		} catch (error) {
			throw new Error(`Error searching artworks: ${error.message}`);
		}
	}
);

export const fetchArtworkById = createAsyncThunk(
	'artwork/fetchArtworkById',
	async (id: string) => {
		try {
			const token = await getApiToken();
			const response = await fetchArtworkData(id, token);

			if (!response.ok) {
				throw new Error('Failed to fetch artwork');
			}

			const data: ArtworkResponse = await response.json();

			return transformArtworkData(data);
		} catch (error) {
			throw new Error(`Error fetching artwork by id ${id}: ${error.message}`);
		}
	}
);

export const getArtworkById = (
	state: ArtworkState,
	id: string
): Artwork | undefined => {
	return (
		state.favorites.find((artwork: Artwork) => artwork.id === id) ||
		state.artworks.find((artwork: Artwork) => artwork.id === id) ||
		state.otherWorks.find((artwork: Artwork) => artwork.id === id) ||
		state.lastViewedArtwork
	);
};

export const setFavorite = createAction<{
	artwork: Artwork;
}>('artwork/setFavorite');

export const sortArtworksByTitleAsc = createAction<ArtworkCategory>(
	'artworks/sortArtworksByTitleAsc'
);
export const sortArtworksByTitleDesc = createAction<ArtworkCategory>(
	'artworks/sortArtworksByTitleDesc'
);
