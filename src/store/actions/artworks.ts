import { BASE_URL } from '@/constants/artApi';
import { ARTWORKS_TOTAL, artworksToSearch } from '@/constants/artworks';
import {
	ArtApiResponse,
	ArtApiSearchResponse,
	ArtworkResponse,
	ArtworkSearchResponse,
} from '@/types/artApi';
import { Artwork } from '@/types/artwork';
import { ArtworkState } from '@/types/store';
import { extractArtistName, getArtsyToken } from '@/utils/artApi';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtworks = createAsyncThunk(
	'artwork/fetchArtworks',
	async () => {
		const token = await getArtsyToken();
		const url = `${BASE_URL}/artworks?size=${ARTWORKS_TOTAL}`;
		const headers = {
			'X-Xapp-Token': token,
		};
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error('Failed to fetch artworks');
		}

		const data: ArtApiResponse = await response.json();
		const artworks = data._embedded.artworks.map(
			(artwork: ArtworkResponse): Artwork => {
				return {
					id: artwork.id,
					title: artwork.title,
					artist: extractArtistName(artwork.slug, artwork.title),
					domainType: artwork.can_share ? 'Public' : 'Private',
					dimensions: artwork.dimensions.cm.text,
					image: artwork._links.image.href.replace('{image_version}', 'large'),
					thumbnail: artwork._links.thumbnail.href,
					repository: artwork.collecting_institution,
					date: artwork.date,
					medium: artwork.medium,
					favorite: false,
				};
			}
		);
		return artworks;
	}
);

export const searchArtworks = createAsyncThunk(
	'artwork/searchArtworks',
	async (query: string) => {
		const token = await getArtsyToken();
		const url = `${BASE_URL}/search?q=${query}&type=artwork&published=true&size=${artworksToSearch}`;
		const headers = {
			'X-Xapp-Token': token,
		};
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error('Failed to fetch artworks');
		}

		const data: ArtApiSearchResponse = await response.json();
		const artworks = data._embedded.results.map(
			(artwork: ArtworkSearchResponse): Artwork => {
				return {
					id: artwork.title.split(' ').join('-'),
					title: artwork.title.split(',').slice(1).join(','),
					artist: artwork.title.split(',')[0],
					domainType: 'Private',
					image: artwork._links.thumbnail.href,
					thumbnail: artwork._links.thumbnail.href,
					dimensions: artwork.description.split(',')[1],
					medium: artwork.description.split(',')[0],
					favorite: false,
				};
			}
		);
		return artworks;
	}
);

export const fetchArtworkById = createAsyncThunk(
	'artwork/fetchArtworkById',
	async (id: string) => {
		const token = await getArtsyToken();
		const url = `${BASE_URL}/artworks/${id}`;
		const headers = {
			'X-Xapp-Token': token,
		};
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error('Failed to fetch artwork');
		}

		const data: ArtworkResponse = await response.json();

		return {
			id: data.id,
			title: data.title,
			artist: extractArtistName(data.slug, data.title),
			domainType: data.can_share ? 'Public' : 'Private',
			dimensions: data.dimensions.cm.text,
			image: data._links.image.href.replace('{image_version}', 'large'),
			thumbnail: data._links.thumbnail.href,
			repository: data.collecting_institution,
			date: data.date,
			medium: data.medium,
			favorite: false,
		} as Artwork;
	}
);

export const getArtworkById = (
	state: ArtworkState,
	id: string
): Artwork | undefined => {
	return state.artworks.find(
		(artwork: Artwork) => artwork.id.toString() === id
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
