import { describe, expect, it } from 'vitest';

import styles from '@/components/ControllerContainer/styles.module.css';

import ControllerContainer from '@/components/ControllerContainer';
import { render, screen } from '@testing-library/react';

describe('ControllerContainer', () => {
	it('should render children', () => {
		render(
			<ControllerContainer>
				<span>Test Content</span>
			</ControllerContainer>
		);

		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});

	it('should apply the correct class to the container', () => {
		render(
			<ControllerContainer>
				<span>Test Content</span>
			</ControllerContainer>
		);

		const container = screen.getByText('Test Content').parentElement;
		expect(container?.className).toMatch(
			new RegExp(styles['controller-container'])
		);
	});
});
