export function extractArtworkId(url: string): string {
	const parts = url.split('/');
	const id = parts[parts.length - 1];
	return id && !isNaN(Number(id)) ? id : '';
}

export function extractArtistName(slug: string, title: string): string {
	const titleWords = title.split(' ');
	const firstWord = titleWords[0].toLowerCase();
	const slugWords = slug.split('-');
	const artistNameWords = [];

	let foundFirstWord = false;
	for (const word of slugWords) {
		if (word === firstWord) {
			foundFirstWord = true;
			break;
		}
		artistNameWords.push(word.charAt(0).toUpperCase() + word.slice(1));
	}

	return foundFirstWord ? artistNameWords.join(' ') : '';
}
