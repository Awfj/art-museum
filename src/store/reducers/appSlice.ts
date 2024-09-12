import { AppState } from '@/types/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppState = {
	menuOpen: false,
	mobile: window.innerWidth < 640,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		openMenu: (state) => {
			state.menuOpen = true;
		},
		closeMenu: (state) => {
			state.menuOpen = false;
		},
		setMobile: (state, action: PayloadAction<boolean>) => {
			state.mobile = action.payload;
		},
	},
});

export const { openMenu, setMobile, closeMenu } = appSlice.actions;
export default appSlice.reducer;
