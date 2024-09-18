import styles from './styles.module.css';

type ControllerContainerProps = {
	children: React.ReactNode;
};

export default function ControllerContainer({
	children,
}: ControllerContainerProps) {
	return <div className={styles['controller-container']}>{children}</div>;
}
