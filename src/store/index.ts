import appReducer from '@/store/reducers/appSlice';
import artworkReducer from '@/store/reducers/artworkSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		app: appReducer,
		artworks: artworkReducer,
	},
});
