import styles from './styles.module.css';

import TextButton from '@/components/TextButton';
import useGoBack from '@/hooks/useGoBack';

interface ErrorProps {
	error?: Error;
}
export default function Error({ error }: ErrorProps) {
	const goBack = useGoBack();

	return (
		<section className={styles.error}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>{error && error?.message + '.'}</p>
			<TextButton onClick={goBack}>Go Back</TextButton>
		</section>
	);
}
