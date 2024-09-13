import { useRouteError } from 'react-router-dom';

import styles from './styles.module.css';

import TextButton from '@/components/TextButton';
import useGoBack from '@/hooks/useGoBack';

type RouteError = {
	statusText?: string;
	message?: string;
};

export default function Error() {
	const error = useRouteError() as RouteError;
	const goBack = useGoBack();

	return (
		<section className={styles.error}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<TextButton onClick={goBack}>Go Back</TextButton>
		</section>
	);
}
