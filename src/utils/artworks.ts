import { ARTWORKS_PER_PAGE, INITIAL_PAGE } from '@/constants/artworks';
import { ArtworkResponse, ArtworkSearchResponse } from '@/types/artApi';
import { Artwork } from '@/types/artwork';
import { ArtworkState, RootState } from '@/types/store';
import { extractArtistName } from '@/utils/artApi';

export function transformArtworks(
	artworks: ArtworkResponse[],
	page: number
): Artwork[] {
	return artworks.map((artwork: ArtworkResponse): Artwork => {
		const artist = extractArtistName(artwork.slug, artwork.title);
		const domainType = artwork.can_share ? 'Public' : 'Private';
		const image = artwork._links.image.href.replace('{image_version}', 'large');

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
			page,
		};
	});
}

export function transformSearchResults(
	results: ArtworkSearchResponse[],
	page: number
): Artwork[] {
	return results.map((artwork: ArtworkSearchResponse): Artwork => {
		const id = encodeURIComponent(artwork.title.split(' ').join('-'));
		const title = artwork.title.split(',').slice(1).join(',');
		const artist = artwork.title.split(',')[0];
		const dimensions = artwork.description.split(',')[1];
		const medium = artwork.description.split(',')[0];

		return {
			id,
			title,
			artist,
			domainType: 'Private',
			image: artwork._links.thumbnail.href,
			thumbnail: artwork._links.thumbnail.href,
			dimensions,
			medium,
			page,
		};
	});
}

export function getFavoriteIds(state: RootState): Set<string> {
	const { favorites } = state.artworks;
	return new Set(favorites.map((favorite) => favorite.id));
}

export function transformArtworkData(data: ArtworkResponse): Artwork {
	const artist = extractArtistName(data.slug, data.title);
	const domainType = data.can_share ? 'Public' : 'Private';
	const image = data._links.image.href.replace('{image_version}', 'large');

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
	};
}

export const sortArtworks = (
	state: ArtworkState,
	compareFn: (a: Artwork, b: Artwork) => number
) => {
	let page = INITIAL_PAGE;
	state.artworks.sort(compareFn);

	state.artworks = state.artworks.map((artwork, index) => {
		if (index % ARTWORKS_PER_PAGE === 0 && index !== 0) {
			page += 1;
		}
		return { ...artwork, page };
	});
};
