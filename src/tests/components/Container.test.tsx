import { describe, expect, it } from 'vitest';

import styles from '@/components/Container/styles.module.css';

import Container from '@/components/Container';
import { render, screen } from '@testing-library/react';

describe('Container', () => {
	it('should render children', () => {
		render(
			<Container>
				<span>Test Content</span>
			</Container>
		);

		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('should apply fixed-region class if fixedRegion prop is true', () => {
		render(
			<Container fixedRegion>
				<span>Test Content</span>
			</Container>
		);

		const container = screen.getByText('Test Content').parentElement;
		expect(container?.className).toMatch(new RegExp(styles['fixed-region']));
	});

	it('should apply vertical class if vertical prop is true', () => {
		render(
			<Container vertical>
				<span>Test Content</span>
			</Container>
		);

		const container = screen.getByText('Test Content').parentElement;
		expect(container?.className).toMatch(new RegExp(styles.vertical));
	});

	it('should apply content class if content prop is true', () => {
		render(
			<Container content>
				<span>Test Content</span>
			</Container>
		);

		const container = screen.getByText('Test Content').parentElement;
		expect(container?.className).toMatch(new RegExp(styles.content));
	});

	it('should apply multiple classes based on props', () => {
		render(
			<Container fixedRegion vertical content>
				<span>Test Content</span>
			</Container>
		);

		const container = screen.getByText('Test Content').parentElement;
		expect(container?.className).toMatch(new RegExp(styles['fixed-region']));
		expect(container?.className).toMatch(new RegExp(styles.vertical));
		expect(container?.className).toMatch(new RegExp(styles.content));
	});
});
