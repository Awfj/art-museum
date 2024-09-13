import styles from './styles.module.css';

type TextButtonProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function TextButton({ children, onClick }: TextButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`base-button ${styles['text-button']}`}
		>
			{children}
		</button>
	);
}
