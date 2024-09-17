import { ArtworkResponse, ArtworkSearchResponse } from '@/types/artApi';
import { Artwork } from '@/types/artwork';
import { RootState } from '@/types/store';
import { extractArtistName } from '@/utils/artApi';

export function transformArtworks(
	artworks: ArtworkResponse[],
	favoriteIds: Set<string>,
	page: number
): Artwork[] {
	return artworks.map((artwork: ArtworkResponse): Artwork => {
		const artist = extractArtistName(artwork.slug, artwork.title);
		const domainType = artwork.can_share ? 'Public' : 'Private';
		const image = artwork._links.image.href.replace('{image_version}', 'large');
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
	});
}

export function transformSearchResults(
	results: ArtworkSearchResponse[],
	favoriteIds: Set<string>,
	page: number
): Artwork[] {
	return results.map((artwork: ArtworkSearchResponse): Artwork => {
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
	});
}

export function getFavoriteIds(state: RootState): Set<string> {
	const { favorites } = state.artworks;
	return new Set(favorites.map((favorite) => favorite.id));
}

export function transformArtworkData(
	data: ArtworkResponse,
	favoriteIds: Set<string>
): Artwork {
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
	};
}
