import React from 'react';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type PageProps = {
	children: React.ReactNode;
	verticalContent?: boolean;
	sectionGap?: number;
};

export default function Page({ verticalContent = false, children }: PageProps) {
	return (
		<>
			<Header />
			<Container content vertical={verticalContent}>
				{children}
			</Container>
			<Footer />
		</>
	);
}
