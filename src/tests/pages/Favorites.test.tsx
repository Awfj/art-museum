import { describe, expect, it, vi } from 'vitest';

import Favorites from '@/pages/Favorites';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/Page', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/PageHeading', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/FavoritesList', () => ({
  default: () => <div>FavoritesList</div>,
}));

vi.mock('@/assets/bookmark.svg', () => ({
  default: () => <svg>BookmarkIcon</svg>,
}));

describe('Favorites', () => {
  it('should render the Page component with verticalContent prop', () => {
    render(<Favorites />);

    const pageElement = screen.getByText('here are your').parentElement;
    expect(pageElement).toBeInTheDocument();
  });

  it('should render the PageHeading component with centered prop', () => {
    render(<Favorites />);

    const headingElement = screen.getByText('here are your');
    expect(headingElement).toBeInTheDocument();
  });

  it('should render the BookmarkIcon and word "favorites"', () => {
    render(<Favorites />);

    expect(screen.getByText('BookmarkIcon')).toBeInTheDocument();
    expect(screen.getByText('favorites')).toBeInTheDocument();
  });

  it('should render the FavoritesList component', () => {
    render(<Favorites />);

    expect(screen.getByText('FavoritesList')).toBeInTheDocument();
  });
});