import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Navigation from '@/components/Navigation';
import { render, screen } from '@testing-library/react';

vi.mock('@/assets/bookmark.svg', () => ({
	default: () => <svg data-testid="bookmark-icon" />,
}));

vi.mock('@/assets/home.svg', () => ({
	default: () => <svg data-testid="home-icon" />,
}));

describe('Navigation', () => {
	it('should render Home link with HomeIcon', () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		const homeLink = screen.getByText('Home');
		expect(homeLink).toBeInTheDocument();
		expect(homeLink.closest('a')).toHaveAttribute('href', '/');
		expect(screen.getByTestId('home-icon')).toBeInTheDocument();
	});

	it('should render Your favorites link with BookmarkIcon', () => {
		render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);

		const favoritesLink = screen.getByText('Your favorites');
		expect(favoritesLink).toBeInTheDocument();
		expect(favoritesLink.closest('a')).toHaveAttribute('href', '/favorites');
		expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
	});
});
