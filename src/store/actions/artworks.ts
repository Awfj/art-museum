import { BASE_URL } from '@/constants/artApi';
import { ARTWORKS_PER_PAGE } from '@/constants/artworks';
import {
	ArtApiResponse,
	ArtApiSearchResponse,
	ArtworkResponse,
	ArtworkSearchResponse,
} from '@/types/artApi';
import { Artwork } from '@/types/artwork';
import { RootState } from '@/types/store';
import { ArtworkState } from '@/types/store';
import { extractArtistName, getArtsyToken } from '@/utils/artApi';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtworks = createAsyncThunk(
	'artwork/fetchArtworks',
	async (page: number, { getState }): Promise<[Artwork[], string]> => {
		const { artworks: storedArtworks } = (getState() as RootState).artworks;
		let { nextArtworksUrl } = (getState() as RootState).artworks;
		const token = await getArtsyToken();

		let dataContainsDuplicates: boolean;
		let data: ArtApiResponse;

		do {
			const url =
				nextArtworksUrl ?? `${BASE_URL}/artworks?size=${ARTWORKS_PER_PAGE}`;
			const headers = {
				'X-Xapp-Token': token,
			};
			const response = await fetch(url, { headers });

			if (!response.ok) {
				throw new Error('Failed to fetch artworks');
			}

			data = await response.json();
			const receivedArtworks = data._embedded.artworks;
			// check if storedArtworks already contain first artwork id from receivedArtworks
			dataContainsDuplicates = storedArtworks.some(
				(artwork: Artwork) => artwork.id === receivedArtworks[0].id
			);
			nextArtworksUrl = data._links.next?.href;
		} while (dataContainsDuplicates);

		const { favorites } = (getState() as RootState).artworks;
		const favoriteIds = new Set(favorites.map((favorite) => favorite.id));

		const artworks = data._embedded.artworks.map(
			(artwork: ArtworkResponse): Artwork => {
				const artist = extractArtistName(artwork.slug, artwork.title);
				const domainType = artwork.can_share ? 'Public' : 'Private';
				const image = artwork._links.image.href.replace(
					'{image_version}',
					'large'
				);
				const favorite = favoriteIds.has(artwork.id);

				return {
					id: artwork.id,
					title: artwork.title,
					artist,
					domainType,
					dimensions: artwork.dimensions.cm.text,
					image,
					thumbnail: artwork._links.thumbnail.href,
					repository: artwork.collecting_institution,
					date: artwork.date,
					medium: artwork.medium,
					favorite,
					page,
				};
			}
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
		const { artworks: storedArtworks } = (getState() as RootState).artworks;
		let { nextArtworksUrl } = (getState() as RootState).artworks;
		const token = await getArtsyToken();

		let dataContainsDuplicates: boolean;
		let data: ArtApiSearchResponse;

		do {
			const url = nextArtworksUrl
				? nextArtworksUrl + '&type=artwork'
				: `${BASE_URL}/search?q=${query}&type=artwork&published=true&size=${ARTWORKS_PER_PAGE}`;

			const headers = {
				'X-Xapp-Token': token,
			};
			const response = await fetch(url, { headers });

			if (!response.ok) {
				throw new Error('Failed to fetch artworks');
			}

			data = await response.json();

			const receivedArtworks = data._embedded.results;
			dataContainsDuplicates = storedArtworks.some((artwork: Artwork) => {
				return (
					artwork.title ===
					receivedArtworks[0].title.split(',').slice(1).join(',')
				);
			});
			nextArtworksUrl = data._links.next?.href;
		} while (dataContainsDuplicates);

		const { favorites } = (getState() as RootState).artworks;
		const favoriteIds = new Set(favorites.map((favorite) => favorite.id));

		const artworks = data._embedded.results.map(
			(artwork: ArtworkSearchResponse): Artwork => {
				const id = encodeURIComponent(artwork.title.split(' ').join('-'));
				const title = artwork.title.split(',').slice(1).join(',');
				const artist = artwork.title.split(',')[0];
				const dimensions = artwork.description.split(',')[1];
				const medium = artwork.description.split(',')[0];
				const favorite = favoriteIds.has(id);

				return {
					id,
					title,
					artist,
					domainType: 'Private',
					image: artwork._links.thumbnail.href,
					thumbnail: artwork._links.thumbnail.href,
					dimensions,
					medium,
					favorite,
					page,
				};
			}
		);
		return [artworks, nextArtworksUrl];
	}
);

export const fetchArtworkById = createAsyncThunk(
	'artwork/fetchArtworkById',
	async (id: string, { getState }) => {
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
		const { favorites } = (getState() as RootState).artworks;
		const favoriteIds = new Set(favorites.map((favorite) => favorite.id));

		const artist = extractArtistName(data.slug, data.title);
		const domainType = data.can_share ? 'Public' : 'Private';
		const image = data._links.image.href.replace('{image_version}', 'large');
		const favorite = favoriteIds.has(data.id);
		
		return {
			id: data.id,
			title: data.title,
			artist,
			domainType,
			dimensions: data.dimensions.cm.text,
			image,
			thumbnail: data._links.thumbnail.href,
			repository: data.collecting_institution,
			date: data.date,
			medium: data.medium,
			favorite,
		} as Artwork;
	}
);

export const getArtworkById = (
	state: ArtworkState,
	id: string
): Artwork | undefined => {
	return (
		state.favorites.find(
			(artwork: Artwork) => artwork.id === encodeURIComponent(id)
		) ||
		state.artworks.find(
			(artwork: Artwork) => artwork.id === encodeURIComponent(id)
		)
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

export const sortArtworks = (
	state: ArtworkState,
	compareFn: (a: Artwork, b: Artwork) => number
) => {
	let artworksWithoutFavorites = state.artworks;
	if (state.favorites.length > 0) {
		artworksWithoutFavorites = state.artworks.slice(0, -state.favorites.length);
	}
	artworksWithoutFavorites.sort(compareFn);
	state.artworks = [...artworksWithoutFavorites, ...state.favorites];
};

export const updateArtworksWithFavorites = (
	artworks: Artwork[],
	favorites: Artwork[]
) => {
	// Set favorite property to true for favorite artworks
	artworks.forEach((artwork) => {
		const isFavorite = favorites.some((favorite) => favorite.id === artwork.id);
		if (isFavorite) {
			artwork.favorite = true;
		}
	});
	// For correct toggle of favorites
	return [...artworks, ...favorites];
};
