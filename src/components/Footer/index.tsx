import styles from './styles.module.css';

import ModsenLogo from '@/assets/logo modsen-02 2.svg';
import Logo from '@/assets/museum-logo 2.svg';
import Container from '@/components/Container';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Container fixedRegion>
				<Logo />
				<ModsenLogo />
			</Container>
		</footer>
	);
}
