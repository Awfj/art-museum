import { beforeEach, describe, expect, it } from 'vitest';

import LocalStorageService from '@/utils/LocalStorageService';

describe('LocalStorageService', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should set and get an item from localStorage', () => {
		const key = 'testKey';
		const value = { name: 'test' };

		LocalStorageService.setItem(key, value);
		const result = LocalStorageService.getItem<typeof value>(key);

		expect(result).toEqual(value);
	});

	it('should return null if the item does not exist in localStorage', () => {
		const key = 'nonExistentKey';
		const result = LocalStorageService.getItem(key);

		expect(result).toBeNull();
	});

	it('should remove an item from localStorage', () => {
		const key = 'testKey';
		const value = { name: 'test' };

		LocalStorageService.setItem(key, value);
		LocalStorageService.removeItem(key);
		const result = LocalStorageService.getItem(key);

		expect(result).toBeNull();
	});
});
