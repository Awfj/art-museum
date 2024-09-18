import { describe, expect, it } from 'vitest';

import styles from '@/components/ContentHeading/styles.module.css';

import ContentHeading from '@/components/ContentHeading';
import { render, screen } from '@testing-library/react';

describe('ContentHeading', () => {
	it('should render the heading and description', () => {
		const heading = 'Test Heading';
		const description = 'Test Description';

		render(<ContentHeading heading={heading} description={description} />);

		expect(screen.getByText(heading)).toBeInTheDocument();
		expect(screen.getByText(description)).toBeInTheDocument();
	});

	it('should apply the correct class to the heading', () => {
		const heading = 'Test Heading';
		const description = 'Test Description';

		render(<ContentHeading heading={heading} description={description} />);

		const headingElement = screen.getByText(heading);
		expect(headingElement.className).toMatch(new RegExp(styles.heading));
	});

	it('should apply the correct class to the description', () => {
		const heading = 'Test Heading';
		const description = 'Test Description';

		render(<ContentHeading heading={heading} description={description} />);

		const descriptionElement = screen.getByText(description);
		expect(descriptionElement.className).toMatch(
			new RegExp(styles.description)
		);
	});
});
