import { ITEMS_SEARCH_MAX_COUNT } from '@/constants/artApi';

export const ARTWORKS_IN_GALLERY = 12;
export const ARTWORKS_TOTAL = 21;
export const ARTWORKS_PER_PAGE = 3;
export const TOTAL_PAGES = 5;
export const INITIAL_PAGE = 1;

export const artworksToSearch =
	ITEMS_SEARCH_MAX_COUNT - (ITEMS_SEARCH_MAX_COUNT % ARTWORKS_PER_PAGE);
