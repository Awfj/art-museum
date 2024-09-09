import React from 'react';

import styles from './styles.module.css';

type PageHeadingProps = {
	children: React.ReactNode;
	centered?: boolean;
};

export default function PageHeading({
	centered = false,
	children,
}: PageHeadingProps) {
	return (
		<h1
			className={`${styles['page-heading']} ${centered ? styles.centered : ''}`}
		>
			{children}
		</h1>
	);
}
