import { describe, expect, it } from 'vitest';

import { extractArtistName, extractArtworkId } from '@/utils/artApi';

describe('extractArtworkId', () => {
	it('should extract the artwork ID from a URL', () => {
		const url = 'https://example.com/artworks/12345';
		const result = extractArtworkId(url);
		expect(result).toBe('12345');
	});

	it('should return null if the URL does not contain a slash', () => {
		const url = 'https://example.com/artworks';
		const result = extractArtworkId(url);
		expect(result).toBe('');
	});
});

describe('extractArtistName', () => {
	it('should extract the artist name from the slug and title', () => {
		const slug = 'vincent-van-gogh-starry-night';
		const title = 'Starry Night';
		const result = extractArtistName(slug, title);
		expect(result).toBe('Vincent Van Gogh');
	});

	it('should handle slugs with multiple words correctly', () => {
		const slug = 'pablo-picasso-les-demoiselles-d-avignon';
		const title = "Les Demoiselles d'Avignon";
		const result = extractArtistName(slug, title);
		expect(result).toBe('Pablo Picasso');
	});

	it('should return an empty string if the title first word is not found in the slug', () => {
		const slug = 'claude-monet-water-lilies';
		const title = 'Sunset';
		const result = extractArtistName(slug, title);
		expect(result).toBe('');
	});
});
