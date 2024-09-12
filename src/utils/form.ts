import debounce from 'lodash.debounce';

import { searchArtworks } from '@/store/actions/artworks';
import { SearchData } from '@/types/form';
import { AppDispatch } from '@/types/store';

export const debouncedSubmit = debounce(
	(data: SearchData, dispatch: AppDispatch) => {
		dispatch(searchArtworks(data.searchTerm));
	},
	300
);
