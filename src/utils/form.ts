import debounce from 'lodash.debounce';

import { INITIAL_PAGE } from '@/constants/artworks';
import { searchArtworks } from '@/store/actions/artworks';
import { SearchData } from '@/types/form';
import { AppDispatch } from '@/types/store';

export const debouncedSubmit = debounce(
	(data: SearchData, dispatch: AppDispatch) => {
		dispatch(searchArtworks({ query: data.searchTerm, page: INITIAL_PAGE }));
	},
	300
);
