import styles from '@/components/Loader/styles.module.css';

import Loader from '@/components/Loader';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
    it('renders the loader div', () => {
        render(<Loader />);
        const loaderDivs = screen.getAllByRole('generic');
        expect(loaderDivs.length).toBeGreaterThan(0);
    });

    it('applies the correct class name from the CSS module', () => {
        render(<Loader />);
        const loaderDivs = screen.getAllByRole('generic');
        const loaderDiv = loaderDivs.find(div => div.classList.contains(styles.loader));
        expect(loaderDiv).toBeInTheDocument();
        expect(loaderDiv).toHaveClass(styles.loader);
    });
});