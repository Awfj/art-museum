import { describe, expect, it, Mock, vi } from 'vitest';

import useGoBack from '@/hooks/useGoBack';
import Error from '@/pages/Error';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('@/components/TextButton', () => ({
	default: ({
		onClick,
		children,
	}: {
		onClick: () => void;
		children: React.ReactNode;
	}) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('@/hooks/useGoBack', () => ({
	default: vi.fn(),
}));

describe('Error', () => {
	it('should render without error message when error prop is not provided', () => {
		render(<Error />);

		expect(screen.getByText('Oops!')).toBeInTheDocument();
		expect(
			screen.getByText('Sorry, an unexpected error has occurred.')
		).toBeInTheDocument();
		expect(screen.queryByText('Test error message.')).not.toBeInTheDocument();
	});

	it('should call goBack function when TextButton is clicked', () => {
		const goBack = vi.fn();
		(useGoBack as Mock).mockReturnValue(goBack);

		render(<Error />);

		const button = screen.getByText('Go Back');
		fireEvent.click(button);

		expect(goBack).toHaveBeenCalled();
	});
});
