import { BASE_URL } from '@/constants/artApi';
import { ARTWORKS_PER_PAGE } from '@/constants/artworks';
import { ArtApiResponse, ArtApiSearchResponse } from '@/types/artApi';
import { Artwork } from '@/types/artwork';

export async function fetchUniqueArtworks(
	token: string,
	storedArtworks: Artwork[],
	initialNextArtworksUrl: string | null
): Promise<[ArtApiResponse, string]> {
	let dataContainsDuplicates: boolean;
	let data: ArtApiResponse;
	let nextArtworksUrl = initialNextArtworksUrl;

	do {
		const url =
			nextArtworksUrl ?? `${BASE_URL}/artworks?size=${ARTWORKS_PER_PAGE}`;
		const headers = { 'X-Xapp-Token': token };
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error('Failed to fetch artworks');
		}

		data = await response.json();
		const receivedArtworks = data._embedded.artworks;
		dataContainsDuplicates = storedArtworks.some(
			(artwork: Artwork) => artwork.id === receivedArtworks[0].id
		);
		nextArtworksUrl = data._links.next?.href;
	} while (dataContainsDuplicates);

	return [data, nextArtworksUrl];
}

export async function fetchUniqueSearchResults(
	token: string,
	storedArtworks: Artwork[],
	initialNextArtworksUrl: string | null,
	query?: string
): Promise<[ArtApiSearchResponse, string]> {
	let dataContainsDuplicates: boolean;
	let data: ArtApiSearchResponse;
	let nextArtworksUrl = initialNextArtworksUrl;

	do {
		const url = nextArtworksUrl
			? `${nextArtworksUrl}&type=artwork`
			: `${BASE_URL}/search?q=${query}&type=artwork&published=true&size=${ARTWORKS_PER_PAGE}`;

		const headers = { 'X-Xapp-Token': token };
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error('Failed to fetch artworks');
		}

		data = await response.json();
		const receivedArtworks = data._embedded.results;
		dataContainsDuplicates = storedArtworks.some(
			(artwork: Artwork) =>
				artwork.title ===
				receivedArtworks[0].title.split(',').slice(1).join(',')
		);
		nextArtworksUrl = data._links.next?.href;
	} while (dataContainsDuplicates);

	return [data, nextArtworksUrl];
}

export async function fetchArtworkData(
	id: string,
	token: string
): Promise<Response> {
	const url = `${BASE_URL}/artworks/${id}`;
	const headers = { 'X-Xapp-Token': token };
	return fetch(url, { headers });
}
