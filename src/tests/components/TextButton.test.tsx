import styles from '@/components/TextButton/styles.module.css';

import TextButton from '@/components/TextButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('TextButton', () => {
	it('renders with children', () => {
		render(<TextButton onClick={() => {}}>Click me</TextButton>);
		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toBeInTheDocument();
	});

	it('calls onClick handler when clicked', () => {
		const handleClick = vi.fn();
		render(<TextButton onClick={handleClick}>Click me</TextButton>);
		const button = screen.getByRole('button', { name: /click me/i });
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('applies the correct class name from the CSS module', () => {
		render(<TextButton onClick={() => {}}>Click me</TextButton>);
		const button = screen.getByRole('button', { name: /click me/i });
		expect(button).toHaveClass('base-button');
		expect(button).toHaveClass(styles['text-button']);
	});
});
