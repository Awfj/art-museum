import styles from './styles.module.css';

import Loader from '@/components/Loader';

export default function LoadingScreen() {
	return (
		<div className={styles['loading-screen']}>
			<Loader />
		</div>
	);
}
