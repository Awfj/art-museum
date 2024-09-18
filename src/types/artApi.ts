export interface ArtApiResponse {
	_embedded: {
		artworks: ArtworkResponse[];
	};
	_links: {
		next?: {
			href: string;
		};
		self: {
			href: string;
		};
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
	total_count: number;
	_embedded: {
		results: ArtworkSearchResponse[];
	};
	_links: {
		next?: {
			href: string;
		};
		self: {
			href: string;
		};
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

export interface ArtApiTokenResponse {
	token: string;
}
