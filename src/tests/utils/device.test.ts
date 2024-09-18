import { describe, expect, it } from 'vitest';

import { getImageWidth } from '@/utils/device';

describe('getImageWidth', () => {
	it('should return 843 when window.innerWidth is greater than or equal to 480', () => {
		Object.defineProperty(window, 'innerWidth', { writable: true, value: 480 });
		expect(getImageWidth()).toBe(843);

		Object.defineProperty(window, 'innerWidth', { writable: true, value: 800 });
		expect(getImageWidth()).toBe(843);
	});

	it('should return 400 when window.innerWidth is less than 480', () => {
		Object.defineProperty(window, 'innerWidth', { writable: true, value: 479 });
		expect(getImageWidth()).toBe(400);

		Object.defineProperty(window, 'innerWidth', { writable: true, value: 320 });
		expect(getImageWidth()).toBe(400);
	});
});
