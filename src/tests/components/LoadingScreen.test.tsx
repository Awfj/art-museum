import styles from '@/components/LoadingScreen/styles.module.css';

import LoadingScreen from '@/components/LoadingScreen';
import { render, screen } from '@testing-library/react';

describe('LoadingScreen', () => {
	it('renders the LoadingScreen component', () => {
		render(<LoadingScreen />);
		const loadingScreenDivs = screen.getAllByRole('generic');
		const loadingScreenDiv = loadingScreenDivs.find((div) =>
			div.classList.contains(styles['loading-screen'])
		);
		expect(loadingScreenDiv).toBeInTheDocument();
	});

	it('applies the correct class name from the CSS module', () => {
		render(<LoadingScreen />);
		const loadingScreenDivs = screen.getAllByRole('generic');
		const loadingScreenDiv = loadingScreenDivs.find((div) =>
			div.classList.contains(styles['loading-screen'])
		);
		expect(loadingScreenDiv).toHaveClass(styles['loading-screen']);
	});
});
