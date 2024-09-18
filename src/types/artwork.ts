export interface Artwork {
	id: string;
	title: string;
	artist: string;
	image: string;
	thumbnail: string;
	domainType: string;
	dimensions: string;
	repository?: string;
	date?: string;
	medium: string;
	page?: number;
}

export enum ArtworkCategory {
	Gallery = 'gallery',
	OtherWorks = 'otherWorks',
	Favorites = 'favorites',
}
