import { beforeEach, describe, expect, it } from 'vitest';

import {
	fetchArtworkById,
	fetchArtworks,
	searchArtworks,
	setFavorite,
} from '@/store/actions/artworks';
import artworkReducer, {
	initiateNewSearch,
	resetLastViewedArtwork,
	setPage,
} from '@/store/reducers/artworkSlice';
import { Status } from '@/types/api';
import { Artwork } from '@/types/artwork';
import { ArtworkState } from '@/types/store';
import LocalStorageService from '@/utils/LocalStorageService';

describe('artworkSlice', () => {
	const initialState: ArtworkState = {
		artworks: [],
		favorites: [],
		otherWorks: [],
		searching: false,
		nextArtworksUrl: null,
		lastViewedArtwork: null,
		page: 1,
		status: Status.Idle,
		error: null,
	};

	beforeEach(() => {
		LocalStorageService.setItem('favorites', []);
	});

	it('should handle initial state', () => {
		expect(artworkReducer(undefined, { type: 'unknown' })).toEqual(
			initialState
		);
	});

	it('should handle setPage', () => {
		const actual = artworkReducer(initialState, setPage(2));
		expect(actual.page).toBe(2);
	});

	it('should handle resetLastViewedArtwork', () => {
		const actual = artworkReducer(
			{
				...initialState,
				lastViewedArtwork: { id: '1', title: 'Test' } as Artwork,
			},
			resetLastViewedArtwork()
		);
		expect(actual.lastViewedArtwork).toBeNull();
	});

	it('should handle initiateNewSearch', () => {
		const actual = artworkReducer(
			{
				...initialState,
				page: 2,
				nextArtworksUrl: 'url',
				artworks: [{ id: '1', title: 'Test' } as Artwork],
				searching: false,
			},
			initiateNewSearch()
		);
		expect(actual.page).toBe(1);
		expect(actual.nextArtworksUrl).toBeNull();
		expect(actual.artworks).toEqual([]);
		expect(actual.searching).toBe(true);
	});

	it('should handle setFavorite', () => {
		const artwork = { id: '1', title: 'Test' } as Artwork;
		const actual = artworkReducer(initialState, setFavorite({ artwork }));
		expect(actual.favorites).toContain(artwork);
	});

	it('should handle fetchArtworks.pending', () => {
		const actual = artworkReducer(initialState, fetchArtworks.pending('', 1));
		expect(actual.status).toBe(Status.Loading);
	});

	it('should handle fetchArtworks.fulfilled', () => {
		const newArtworks = [{ id: '1', title: 'Test' } as Artwork];
		const nextArtworksUrl = 'nextUrl';
		const actual = artworkReducer(
			initialState,
			fetchArtworks.fulfilled([newArtworks, nextArtworksUrl], '', 1)
		);
		expect(actual.status).toBe(Status.Succeeded);
		expect(actual.artworks).toEqual(newArtworks);
		expect(actual.nextArtworksUrl).toBe(nextArtworksUrl);
	});

	it('should handle fetchArtworks.rejected', () => {
		const error = new Error('Failed to fetch artworks');
		const actual = artworkReducer(
			initialState,
			fetchArtworks.rejected(error, '', 1)
		);
		expect(actual.status).toBe(Status.Failed);
		expect(actual.error).toBe(error.message);
	});

	it('should handle searchArtworks.pending', () => {
		const actual = artworkReducer(initialState, searchArtworks.pending('', { query: 'test', page: 1 }));
		expect(actual.status).toBe(Status.Loading);
		expect(actual.error).toBeNull();
	});

	it('should handle searchArtworks.fulfilled', () => {
		const newArtworks = [{ id: '1', title: 'Test' } as Artwork];
		const nextArtworksUrl = 'nextUrl';
		const actual = artworkReducer(
			initialState,
			searchArtworks.fulfilled([newArtworks, nextArtworksUrl], '', {
				query: 'test',
				page: 1,
			})
		);
		expect(actual.status).toBe(Status.Succeeded);
		expect(actual.artworks).toEqual(newArtworks);
		expect(actual.nextArtworksUrl).toBe(nextArtworksUrl);
	});

	it('should handle searchArtworks.rejected', () => {
		const error = { name: 'Error', message: 'Failed to fetch artworks' };
		const actual = artworkReducer(
			initialState,
			searchArtworks.rejected(error, '', { query: 'test', page: 1 })
		);
		expect(actual.status).toBe(Status.Failed);
		expect(actual.error).toBe(error.message);
	});

	it('should handle fetchArtworkById.pending', () => {
		const actual = artworkReducer(initialState, fetchArtworkById.pending('', '1'));
		expect(actual.status).toBe(Status.Loading);
		expect(actual.error).toBeNull();
	});

	it('should handle fetchArtworkById.fulfilled', () => {
		const artwork = { id: '1', title: 'Test' } as Artwork;
		const actual = artworkReducer(
			initialState,
			fetchArtworkById.fulfilled(artwork, '', '1')
		);
		expect(actual.status).toBe(Status.Succeeded);
		expect(actual.lastViewedArtwork).toEqual(artwork);
	});

	it('should handle fetchArtworkById.rejected', () => {
		const error = { name: 'Error', message: 'Failed to fetch artwork' };
		const actual = artworkReducer(
			initialState,
			fetchArtworkById.rejected(error, '', '1')
		);
		expect(actual.status).toBe(Status.Failed);
		expect(actual.error).toBe(error.message);
	});
});
