import { BASE_URL } from '@/constants/artApi';
import { ArtApiTokenResponse } from '@/types/artApi';

export const extractArtworkId = (url: string): string | null => {
	const lastSlashIndex = url.lastIndexOf('/');
	return url.slice(lastSlashIndex + 1);
};

export const extractArtistName = (slug: string, title: string): string => {
	const titleFirstWord = title.split(' ')[0].toLowerCase();
	const index = slug.indexOf(titleFirstWord + '-');

	return slug
		.slice(0, index - 1)
		.split('-')
		.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const getArtsyToken = async (): Promise<string> => {
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
