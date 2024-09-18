import { vi } from 'vitest';

import Footer from '@/components/Footer';
import { render, screen } from '@testing-library/react';

vi.mock('@/assets/logo modsen-02 2.svg', () => ({
	default: () => <svg data-testid="modsen-logo" />,
}));
vi.mock('@/assets/museum-logo 2.svg', () => ({
	default: () => <svg data-testid="museum-logo" />,
}));

describe('Footer Component', () => {
	it('renders the footer', () => {
		render(<Footer />);
		expect(screen.getByRole('contentinfo')).toBeInTheDocument();
	});

	it('renders the Modsen logo', () => {
		render(<Footer />);
		expect(screen.getByTestId('modsen-logo')).toBeInTheDocument();
	});

	it('renders the Museum logo', () => {
		render(<Footer />);
		expect(screen.getByTestId('museum-logo')).toBeInTheDocument();
	});
});
