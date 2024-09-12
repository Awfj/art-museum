import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { closeMenu, setMobile } from '@/store/reducers/appSlice';

export const useCloseMenu = (menuOpen: boolean, mobile: boolean) => {
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (menuOpen && event.key === 'Escape') {
				dispatch(closeMenu());
			}
		};

		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [menuOpen, dispatch]);

	useEffect(() => {
		dispatch(closeMenu());
	}, [location, dispatch]);

	useEffect(() => {
		const handleResize = () => {
			const nowMobile = window.innerWidth < 640;
			dispatch(setMobile(nowMobile));
			if (nowMobile !== mobile) {
				dispatch(closeMenu());
			}
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [mobile, dispatch]);
};
