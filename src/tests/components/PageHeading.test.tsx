import PageHeading from '@/components/PageHeading';
import { render, screen } from '@testing-library/react';

describe('PageHeading Component', () => {
	it('renders the children text correctly', () => {
		render(<PageHeading>Test Heading</PageHeading>);

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
			'Test Heading'
		);
	});

	it('does not apply the centered class when centered prop is false', () => {
		render(<PageHeading>Non-centered Heading</PageHeading>);

		const headingElement = screen.getByRole('heading', { level: 1 });

		expect(headingElement).not.toHaveClass('centered');
	});
});
