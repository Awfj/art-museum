import { useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import useGoBack from '@/hooks/useGoBack';
import { renderHook } from '@testing-library/react-hooks';

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
}));

describe('useGoBack', () => {
	let navigateMock: Mock;

	beforeEach(() => {
		navigateMock = vi.fn();
		(useNavigate as Mock).mockReturnValue(navigateMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should navigate back when called', () => {
		const { result } = renderHook(() => useGoBack());

		result.current();

		expect(navigateMock).toHaveBeenCalledWith(-1);
	});
});
