import { describe, expect, it } from 'vitest';

import appReducer, {
	closeMenu,
	openMenu,
	setMobile,
} from '@/store/reducers/appSlice';
import { AppState } from '@/types/store';

describe('appSlice', () => {
	const initialState: AppState = {
		menuOpen: false,
		mobile: window.innerWidth < 640,
	};

	it('should handle initial state', () => {
		expect(appReducer(undefined, { type: 'unknown' })).toEqual(initialState);
	});

	it('should handle openMenu', () => {
		const actual = appReducer(initialState, openMenu());
		expect(actual.menuOpen).toBe(true);
	});

	it('should handle closeMenu', () => {
		const actual = appReducer({ ...initialState, menuOpen: true }, closeMenu());
		expect(actual.menuOpen).toBe(false);
	});

	it('should handle setMobile', () => {
		const actual = appReducer(initialState, setMobile(true));
		expect(actual.mobile).toBe(true);
	});
});
