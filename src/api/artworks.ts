import { BASE_URL } from '@/constants/artApi';
import { ARTWORKS_PER_PAGE, OTHER_WORKS_COUNT } from '@/constants/artworks';
import { ArtApiResponse, ArtApiSearchResponse } from '@/types/artApi';
import { ArtApiTokenResponse } from '@/types/artApi';

export const getApiToken = async (): Promise<string> => {
	try {
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
	} catch (error) {
		throw new Error(`Error fetching API token: ${error.message}`);
	}
};

export async function fetchUniqueArtworks(
	token: string,
	storedArtworkIds: Set<string>,
	initialNextArtworksUrl: string | null
): Promise<[ArtApiResponse, string]> {
	try {
		let dataContainsDuplicates: boolean;
		let data: ArtApiResponse;
		let nextArtworksUrl = initialNextArtworksUrl;

		do {
			let url: string;
			if (nextArtworksUrl) {
				const urlObj = new URL(nextArtworksUrl);
				urlObj.searchParams.set('size', ARTWORKS_PER_PAGE.toString());
				url = urlObj.toString();
			} else {
				url = `${BASE_URL}/artworks?size=${OTHER_WORKS_COUNT + ARTWORKS_PER_PAGE}`;
			}

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
	} catch (error) {
		throw new Error(`Error fetching unique artworks: ${error.message}`);
	}
}

export async function fetchUniqueSearchResults(
	token: string,
	storedArtworkIds: Set<string>,
	initialNextArtworksUrl: string | null,
	query?: string
): Promise<[ArtApiSearchResponse, string]> {
	try {
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
	} catch (error) {
		throw new Error(`Error fetching unique search results: ${error.message}`);
	}
}

export async function fetchArtworkData(
	id: string,
	token: string
): Promise<Response> {
	try {
		const url = `${BASE_URL}/artworks/${id}`;
		const headers = { 'X-Xapp-Token': token };
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error('Failed to fetch artwork data');
		}

		return response;
	} catch (error) {
		throw new Error(
			`Error fetching artwork data for id ${id}: ${error.message}`
		);
	}
}
