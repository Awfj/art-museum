import styles from './styles.module.css';

type ContentHeadingProps = {
	heading: string;
	description: string;
};

export default function ContentHeading({
	heading,
	description,
}: ContentHeadingProps) {
	return (
		<div>
			<p className={styles.description}>{description}</p>
			<h2 className={styles.heading}>{heading}</h2>
		</div>
	);
}
