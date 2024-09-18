import { describe, expect, it } from 'vitest';

import Page from '@/components/Page';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/Header', () => ({
	default: () => <div>Header</div>,
}));

vi.mock('@/components/Footer', () => ({
	default: () => <div>Footer</div>,
}));

vi.mock('@/components/Container', () => ({
	default: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

describe('Page', () => {
	it('should render the Header, Footer, and children', () => {
		render(
			<Page>
				<span>Test Content</span>
			</Page>
		);

		expect(screen.getByText('Header')).toBeInTheDocument();
		expect(screen.getByText('Footer')).toBeInTheDocument();
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});
});
