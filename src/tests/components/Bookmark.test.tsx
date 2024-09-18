import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { vi } from 'vitest';

import Bookmark from '@/components/Bookmark';
import { setFavorite } from '@/store/actions/artworks';
import { Artwork } from '@/types/artwork';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('@/store/actions/artworks', () => ({
	setFavorite: vi.fn(),
}));

const mockStore = configureStore([]);
const artwork: Partial<Artwork> = {
	id: '1',
	title: 'Test Artwork',
};

describe('Bookmark', () => {
	let store: ReturnType<typeof mockStore>;

	beforeEach(() => {
		store = mockStore({
			artworks: {
				favorites: [],
			},
		});
		store.dispatch = vi.fn();
	});

	it('should render the Bookmark button', () => {
		render(
			<Provider store={store}>
				<Bookmark artwork={artwork as Artwork} />
			</Provider>
		);

		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should dispatch setFavorite action on click', () => {
		render(
			<Provider store={store}>
				<Bookmark artwork={artwork as Artwork} />
			</Provider>
		);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(store.dispatch).toHaveBeenCalledWith(
			setFavorite({ artwork: artwork as Artwork })
		);
	});

	it('should apply favorite class if artwork is in favorites', () => {
		store = mockStore({
			artworks: {
				favorites: [artwork],
			},
		});

		render(
			<Provider store={store}>
				<Bookmark artwork={artwork as Artwork} />
			</Provider>
		);

		const button = screen.getByRole('button');
		expect(button.className).toMatch(/favorite/);
	});

	it('should apply floaty class if floaty prop is true', () => {
		render(
			<Provider store={store}>
				<Bookmark artwork={artwork as Artwork} floaty />
			</Provider>
		);

		const button = screen.getByRole('button');
		expect(button.className).toMatch(/floaty/);
	});
});
