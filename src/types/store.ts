import { store } from '@/store';
import { Status } from '@/types/api';
import { Artwork } from '@/types/artwork';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ArtworkState {
	artworks: Artwork[];
	favorites: Artwork[];
	status: Status;
	error?: string | null;
}

export interface AppState {
	menuOpen: boolean;
	mobile: boolean;
}
