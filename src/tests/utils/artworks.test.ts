import { describe, expect, it } from 'vitest';

import { ArtworkResponse } from '@/types/artApi';
import { Artwork } from '@/types/artwork';
import { ArtworkState, RootState } from '@/types/store';
import {
	getFavoriteIds,
	sortArtworks,
	transformArtworkData,
	transformArtworks,
} from '@/utils/artworks';

describe('transformArtworks', () => {
	it('should transform artworks correctly', () => {
		const artworks: ArtworkResponse[] = [
			{
				id: '1',
				title: 'Artwork 1',
				slug: 'artist-artwork-1',
				can_share: true,
				dimensions: { cm: { text: '10 x 10 cm' } },
				_links: {
					image: { href: 'http://example.com/image/{image_version}' },
					thumbnail: { href: 'http://example.com/thumbnail' },
				},
				collecting_institution: 'Museum 1',
				date: '2021',
				medium: 'Oil on canvas',
			},
		];
		const page = 1;
		const result = transformArtworks(artworks, page);
		expect(result).toEqual([
			{
				id: '1',
				title: 'Artwork 1',
				artist: 'Artist',
				domainType: 'Public',
				dimensions: '10 x 10 cm',
				image: 'http://example.com/image/large',
				thumbnail: 'http://example.com/thumbnail',
				repository: 'Museum 1',
				date: '2021',
				medium: 'Oil on canvas',
				page,
			},
		]);
	});
});

describe('getFavoriteIds', () => {
	it('should return a set of favorite IDs', () => {
		const state: RootState = {
			artworks: {
				favorites: [{ id: '1' }, { id: '2' }],
			},
		} as RootState;
		const result = getFavoriteIds(state);
		expect(result).toEqual(new Set(['1', '2']));
	});
});

describe('transformArtworkData', () => {
	it('should transform artwork data correctly', () => {
		const data: ArtworkResponse = {
			id: '1',
			title: 'Artwork 1',
			slug: 'artist-artwork-1',
			can_share: true,
			dimensions: { cm: { text: '10 x 10 cm' } },
			_links: {
				image: { href: 'http://example.com/image/{image_version}' },
				thumbnail: { href: 'http://example.com/thumbnail' },
			},
			collecting_institution: 'Museum 1',
			date: '2021',
			medium: 'Oil on canvas',
		};
		const result = transformArtworkData(data);
		expect(result).toEqual({
			id: '1',
			title: 'Artwork 1',
			artist: 'Artist',
			domainType: 'Public',
			dimensions: '10 x 10 cm',
			image: 'http://example.com/image/large',
			thumbnail: 'http://example.com/thumbnail',
			repository: 'Museum 1',
			date: '2021',
			medium: 'Oil on canvas',
		});
	});
});

describe('sortArtworks', () => {
	it('should sort artworks and update page numbers correctly', () => {
		const state: ArtworkState = {
			artworks: [
				{ id: '1', title: 'Artwork 1', page: 1 } as Artwork,
				{ id: '2', title: 'Artwork 2', page: 1 } as Artwork,
				{ id: '3', title: 'Artwork 3', page: 1 } as Artwork,
				{ id: '4', title: 'Artwork 4', page: 1 } as Artwork,
			],
		} as ArtworkState;
		const compareFn = (a: Artwork, b: Artwork) =>
			a.title.localeCompare(b.title);
		sortArtworks(state, compareFn);
		expect(state.artworks).toEqual([
			{ id: '1', title: 'Artwork 1', page: 1 },
			{ id: '2', title: 'Artwork 2', page: 1 },
			{ id: '3', title: 'Artwork 3', page: 1 },
			{ id: '4', title: 'Artwork 4', page: 2 },
		]);
	});
});
