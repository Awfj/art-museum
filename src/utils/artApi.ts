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
