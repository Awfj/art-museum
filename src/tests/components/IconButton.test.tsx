import { vi } from 'vitest';

import IconButton from '@/components/IconButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('IconButton Component', () => {
	it('renders correctly with children', () => {
		render(<IconButton onClick={() => {}}>Test Icon</IconButton>);

		expect(screen.getByText('Test Icon')).toBeInTheDocument();
	});

	it('calls onClick handler when clicked', () => {
		const handleClick = vi.fn();
		render(<IconButton onClick={handleClick}>Click Me</IconButton>);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('forwards ref to the button element', () => {
		const ref = { current: null };
		render(
			<IconButton ref={ref} onClick={() => {}}>
				Ref Button
			</IconButton>
		);

		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});
});
