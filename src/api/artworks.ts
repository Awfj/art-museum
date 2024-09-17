import { BASE_URL } from '@/constants/artApi';
import { ARTWORKS_PER_PAGE } from '@/constants/artworks';
import { ArtApiResponse, ArtApiSearchResponse } from '@/types/artApi';
import { ArtApiTokenResponse } from '@/types/artApi';

export const getApiToken = async (): Promise<string> => {
	const response = await fetch(`${BASE_URL}/tokens/xapp_token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			client_id: import.meta.env.VITE_ART_API_CLIENT_ID,
			client_secret: import.meta.env.VITE_ART_API_CLIENT_SECRET,
		}),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch token');
	}

	const data: ArtApiTokenResponse = await response.json();
	return data.token;
};

export async function fetchUniqueArtworks(
	token: string,
	storedArtworkIds: Set<string>,
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

		dataContainsDuplicates = receivedArtworks.some((artwork) =>
			storedArtworkIds.has(artwork.id)
		);
		nextArtworksUrl = data._links.next?.href;
	} while (dataContainsDuplicates);

	return [data, nextArtworksUrl];
}

export async function fetchUniqueSearchResults(
	token: string,
	storedArtworkIds: Set<string>,
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
		dataContainsDuplicates = receivedArtworks.some((artwork) => {
			const id = encodeURIComponent(artwork.title.split(' ').join('-'));
			return storedArtworkIds.has(id);
		});
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
