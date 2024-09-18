import InfoBlock from '@/components/InfoBlock';
import { Artwork } from '@/types/artwork';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/Bookmark', () => ({
  default: ({ artwork }: { artwork: Artwork }) => <div>Bookmark for {artwork.title}</div>,
}));

describe('InfoBlock Component', () => {
  const mockArtwork: Partial<Artwork> = {
    id: '1',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    domainType: 'Painting',
  };

  it('renders artwork details correctly', () => {
    render(<InfoBlock artwork={mockArtwork as Artwork} />);

    expect(screen.getByText('Starry Night')).toBeInTheDocument();
    expect(screen.getByText('Vincent van Gogh')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toBeInTheDocument();
  });

  it('renders the Bookmark component with the correct artwork prop', () => {
    render(<InfoBlock artwork={mockArtwork as Artwork} />);

    expect(screen.getByText('Bookmark for Starry Night')).toBeInTheDocument();
  });
});
