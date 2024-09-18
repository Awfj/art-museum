import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import {
	fetchUniqueArtworks,
	fetchUniqueSearchResults,
	getApiToken,
} from '@/api/artworks';
import {
	fetchArtworks,
	getArtworkById,
	searchArtworks,
	setFavorite,
	sortArtworksByTitleAsc,
	sortArtworksByTitleDesc,
} from '@/store/actions/artworks';
import { Status } from '@/types/api';
import { Artwork, ArtworkCategory } from '@/types/artwork';
import { RootState } from '@/types/store';
import { transformArtworks, transformSearchResults } from '@/utils/artworks';

vi.mock('@/api/artworks', () => ({
	fetchArtworkData: vi.fn(),
	fetchUniqueArtworks: vi.fn(),
	fetchUniqueSearchResults: vi.fn(),
	getApiToken: vi.fn(),
}));

vi.mock('@/utils/artworks', () => ({
	transformArtworkData: vi.fn(),
	transformArtworks: vi.fn(),
	transformSearchResults: vi.fn(),
}));

describe('artworks actions', () => {
	const mockState: RootState = {
		artworks: {
			artworks: [],
			nextArtworksUrl: '',
			favorites: [],
			otherWorks: [],
			lastViewedArtwork: undefined,
			searching: false,
			page: 0,
			status: Status.Idle,
		},
		app: null,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('fetchArtworks', () => {
		it('should fetch and transform artworks', async () => {
			const mockToken = 'mockToken';
			const mockData = { _embedded: { artworks: [] } };
			const mockNextUrl = 'nextUrl';
			const mockTransformedArtworks: Artwork[] = [];

			(getApiToken as Mock).mockResolvedValue(mockToken);
			(fetchUniqueArtworks as Mock).mockResolvedValue([mockData, mockNextUrl]);
			(transformArtworks as Mock).mockReturnValue(mockTransformedArtworks);

			const thunk = fetchArtworks(1);
			const dispatch = vi.fn();
			const getState = () => mockState;

			const result = await thunk(dispatch, getState, undefined);

			expect(getApiToken).toHaveBeenCalled();
			expect(fetchUniqueArtworks).toHaveBeenCalledWith(
				mockToken,
				new Set(),
				''
			);
			expect(transformArtworks).toHaveBeenCalledWith(
				mockData._embedded.artworks,
				1
			);
			expect(result.payload).toEqual([mockTransformedArtworks, mockNextUrl]);
		});
	});

	describe('searchArtworks', () => {
		it('should search and transform artworks', async () => {
			const mockToken = 'mockToken';
			const mockData = { _embedded: { results: [] } };
			const mockNextUrl = 'nextUrl';
			const mockTransformedArtworks: Artwork[] = [];

			(getApiToken as Mock).mockResolvedValue(mockToken);
			(fetchUniqueSearchResults as Mock).mockResolvedValue([
				mockData,
				mockNextUrl,
			]);
			(transformSearchResults as Mock).mockReturnValue(mockTransformedArtworks);

			const thunk = searchArtworks({ query: 'test', page: 1 });
			const dispatch = vi.fn();
			const getState = () => mockState;

			const result = await thunk(dispatch, getState, undefined);

			expect(getApiToken).toHaveBeenCalled();
			expect(fetchUniqueSearchResults).toHaveBeenCalledWith(
				mockToken,
				new Set(),
				'',
				'test'
			);
			expect(transformSearchResults).toHaveBeenCalledWith(
				mockData._embedded.results,
				1
			);
			expect(result.payload).toEqual([mockTransformedArtworks, mockNextUrl]);
		});
	});

	describe('getArtworkById', () => {
		it('should return artwork from state', () => {
			const mockArtwork: Artwork = {
				id: '1',
				title: 'Test Artwork',
				artist: '',
				image: '',
				thumbnail: '',
				domainType: '',
				dimensions: '',
				medium: '',
			};
			const state = {
				...mockState.artworks,
				artworks: [mockArtwork],
			};

			const result = getArtworkById(state, '1');

			expect(result).toEqual(mockArtwork);
		});

		it('should return undefined if artwork not found', () => {
			const state = mockState.artworks;

			const result = getArtworkById(state, '1');

			expect(result).toBeUndefined();
		});
	});

	describe('setFavorite', () => {
		it('should create setFavorite action', () => {
			const mockArtwork: Artwork = {
				id: '1',
				title: 'Test Artwork',
				artist: '',
				image: '',
				thumbnail: '',
				domainType: '',
				dimensions: '',
				medium: '',
			};

			const action = setFavorite({ artwork: mockArtwork });

			expect(action.type).toBe('artwork/setFavorite');
			expect(action.payload).toEqual({ artwork: mockArtwork });
		});
	});

	describe('sortArtworksByTitleAsc', () => {
		it('should create sortArtworksByTitleAsc action', () => {
			const action = sortArtworksByTitleAsc(ArtworkCategory.Favorites);

			expect(action.type).toBe('artworks/sortArtworksByTitleAsc');
			expect(action.payload).toBe(ArtworkCategory.Favorites);
		});
	});

	describe('sortArtworksByTitleDesc', () => {
		it('should create sortArtworksByTitleDesc action', () => {
			const action = sortArtworksByTitleDesc(ArtworkCategory.Favorites);

			expect(action.type).toBe('artworks/sortArtworksByTitleDesc');
			expect(action.payload).toBe(ArtworkCategory.Favorites);
		});
	});
});
