import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

import styles from './styles.module.css';

import Logo from '@/assets/museum-logo 2.svg';
import Container from '@/components/Container';
import IconButton from '@/components/IconButton';
import Navigation from '@/components/Navigation';
import { useCloseMenu } from '@/hooks/useCloseMenu';
import { closeMenu, openMenu } from '@/store/reducers/appSlice';
import { RootState } from '@/types/store';

export default function Header() {
	const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
	const openButtonRef = useRef<HTMLButtonElement>(null);

	const menuOpen = useSelector((state: RootState) => state.app.menuOpen);
	const mobile = useSelector((state: RootState) => state.app.mobile);
	const dispatch = useDispatch();
	useCloseMenu(menuOpen, mobile);

	const handleMenuOpen = () => {
		dispatch(openMenu());
	};

	const handleMenuClose = () => {
		dispatch(closeMenu());
	};

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}, [menuOpen]);

	useEffect(() => {
		if (openButtonRef.current) {
			const rect = openButtonRef.current.getBoundingClientRect();
			setButtonPosition({
				top: rect.top,
				right: rect.y,
			});
		}
	}, [menuOpen]);

	return (
		<header className={styles.header}>
			<Container fixedRegion>
				<Logo />

				{!mobile && <Navigation />}

				{mobile && menuOpen && (
					<div className={styles.overlay}>
						<Navigation />
						<IconButton
							onClick={handleMenuClose}
							style={{ top: buttonPosition.top, right: buttonPosition.right }}
						>
							<X />
						</IconButton>
					</div>
				)}

				{mobile && (
					<IconButton
						ref={openButtonRef}
						onClick={handleMenuOpen}
						className={menuOpen ? 'hidden' : ''}
					>
						<Menu />
					</IconButton>
				)}
			</Container>
		</header>
	);
}
