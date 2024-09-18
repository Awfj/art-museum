import { beforeEach, describe, expect, it, vi } from 'vitest';

import { INITIAL_PAGE } from '@/constants/artworks';
import { searchArtworks } from '@/store/actions/artworks';
import { SearchData } from '@/types/form';
import { AppDispatch } from '@/types/store';
import { debouncedSubmit } from '@/utils/form';

vi.mock('lodash.debounce', () => ({
	default: (fn) => fn,
}));

vi.mock('@/store/actions/artworks', () => ({
	searchArtworks: vi.fn(),
}));

describe('debouncedSubmit', () => {
	let dispatch: AppDispatch;
	let data: SearchData;

	beforeEach(() => {
		dispatch = vi.fn();
		data = { searchTerm: 'test' };
	});

	it('should dispatch searchArtworks with correct parameters', () => {
		debouncedSubmit(data, dispatch);

		expect(dispatch).toHaveBeenCalledWith(
			searchArtworks({ query: data.searchTerm, page: INITIAL_PAGE })
		);
	});
});
