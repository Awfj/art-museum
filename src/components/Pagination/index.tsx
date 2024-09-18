import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import styles from './styles.module.css';

import { TOTAL_PAGES } from '@/constants/artworks';
import { Status } from '@/types/api';
import { RootState } from '@/types/store';

type PaginationProps = {
	currentPage: number;
	onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
	currentPage,
	onPageChange,
}: PaginationProps) {
	const searching = useSelector((state: RootState) => state.artworks.searching);
	const status = useSelector((state: RootState) => state.artworks.status);
	const [pages, setPages] = useState<number[]>(
		Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1)
	);

	useEffect(() => {
		if (searching && currentPage === 1) {
			const newPages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
			setPages(newPages);
		}
	}, [currentPage, searching]);

	const handlePrevPage = useCallback(() => {
		const prevPage = currentPage - 1;

		if (prevPage < 1) {
			return;
		}

		if (pages.at(-1) > TOTAL_PAGES) {
			setPages((prev) => [prev[0] - 1, ...prev].slice(0, -1));
		}
		onPageChange(prevPage);
	}, [currentPage, pages, onPageChange]);

	const handleNextPage = useCallback(() => {
		const nextPage = currentPage + 1;

		if (nextPage > TOTAL_PAGES) {
			setPages((prev) => [...prev, nextPage].slice(1));
		}
		onPageChange(nextPage);
	}, [currentPage, onPageChange]);

	const handleClick = useCallback(
		(number: number) => {
			onPageChange(number);
		},
		[onPageChange]
	);

	const memoizedPages = useMemo(() => pages, [pages]);
	const loading = status === Status.Loading;

	return (
		<div className={styles.pagination}>
			<div className={styles['page-numbers']}>
				{currentPage > 1 && (
					<button onClick={handlePrevPage} disabled={loading}>
						<ChevronLeft />
					</button>
				)}

				{memoizedPages.map((number) => (
					<button
						className={currentPage === number ? styles.active : ''}
						key={number}
						onClick={() => handleClick(number)}
						disabled={number === currentPage || loading}
					>
						{number}
					</button>
				))}

				<button onClick={handleNextPage} disabled={loading}>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
}
