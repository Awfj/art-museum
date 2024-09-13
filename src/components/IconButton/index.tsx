import { CSSProperties, forwardRef } from 'react';

import styles from './styles.module.css';

type IconButtonProps = {
	children: React.ReactNode;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
	style?: CSSProperties;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ onClick, className, children, style }, ref) => {
		return (
			<button
				ref={ref}
				onClick={onClick}
				className={`${className} ${styles['icon-button']}`}
				style={style}
			>
				{children}
			</button>
		);
	}
);

export default IconButton;
