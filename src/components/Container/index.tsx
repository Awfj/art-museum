import styles from './styles.module.css';

type ContainerProps = {
	children: React.ReactNode;
	content?: boolean;
	vertical?: boolean;
	fixedRegion?: boolean;
};

export default function Container({
	fixedRegion = false,
	vertical = false,
	content = false,
	children,
}: ContainerProps) {
	return (
		<div
			className={`${styles.container} ${fixedRegion ? styles['fixed-region'] : ''} ${vertical ? styles.vertical : ''} ${content ? styles.content : ''} `}
		>
			{children}
		</div>
	);
}
