import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Mock, vi } from 'vitest';

import { useCloseMenu } from '@/hooks/useCloseMenu';
import { closeMenu, setMobile } from '@/store/reducers/appSlice';
import { renderHook } from '@testing-library/react-hooks';

vi.mock('react-redux', () => ({
	useDispatch: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
	useLocation: vi.fn(),
}));

vi.mock('@/store/reducers/appSlice', () => ({
	closeMenu: vi.fn(),
	setMobile: vi.fn(),
}));

describe('useCloseMenu', () => {
	let dispatchMock: Mock;
	let locationMock: Mock;

	beforeEach(() => {
		dispatchMock = vi.fn();
		(useDispatch as unknown as Mock).mockReturnValue(dispatchMock);
		locationMock = { pathname: '/test' } as unknown as Mock;
		(useLocation as Mock).mockReturnValue(locationMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should dispatch closeMenu on Escape key press when menu is open', () => {
		renderHook(() => useCloseMenu(true, false));

		const event = new KeyboardEvent('keydown', { key: 'Escape' });
		document.dispatchEvent(event);

		expect(dispatchMock).toHaveBeenCalledWith(closeMenu());
	});

	it('should dispatch closeMenu on location change', () => {
		renderHook(() => useCloseMenu(false, false));

		(useLocation as Mock).mockReturnValue({ pathname: '/new-path' });

		expect(dispatchMock).toHaveBeenCalledWith(closeMenu());
	});

	it('should dispatch setMobile and closeMenu on window resize', () => {
		renderHook(() => useCloseMenu(false, false));

		const resizeEvent = new Event('resize');
		window.innerWidth = 500;
		window.dispatchEvent(resizeEvent);

		expect(dispatchMock).toHaveBeenCalledWith(setMobile(true));
		expect(dispatchMock).toHaveBeenCalledWith(closeMenu());
	});
});
