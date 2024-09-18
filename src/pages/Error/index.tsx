import styles from './styles.module.css';
interface ErrorProps {
	error?: Error;
}
export default function Error({ error }: ErrorProps) {
	return (
		<section className={styles.error}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>{error && error?.message + '.'}</p>
		</section>
	);
}
