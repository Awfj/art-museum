export interface ArtApiResponse {
	_embedded: {
		artworks: ArtworkResponse[];
	};
}

export interface ArtworkResponse {
	id: string;
	title: string;
	slug: string;
	can_share: boolean;
	dimensions: {
		cm: {
			text: string;
		};
	};
	_links: {
		image: {
			href: string;
		};
		thumbnail: {
			href: string;
		};
	};
	collecting_institution: string;
	date: string;
	medium: string;
}

export interface ArtApiSearchResponse {
	_embedded: {
		results: ArtworkSearchResponse[];
	};
}

export interface ArtworkSearchResponse {
	title: string;
	_links: {
		thumbnail: {
			href: string;
		};
	};
	description: string;
}
