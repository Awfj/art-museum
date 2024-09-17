import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import styles from './styles.module.css';

import { TOTAL_PAGES } from '@/constants/artworks';

type PaginationProps = {
	currentPage: number;
	onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
	currentPage,
	onPageChange,
}: PaginationProps) {
	const [pages, setPages] = useState<number[]>(
		Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1)
	);

	const handlePrevPage = () => {
		const prevPage = currentPage - 1;

		if (prevPage < 1) {
			return;
		}

		if (pages.at(-1) > TOTAL_PAGES) {
			setPages((prev) => [prev[0] - 1, ...prev].slice(0, -1));
		}
		onPageChange(prevPage);
	};

	const handleNextPage = () => {
		const nextPage = currentPage + 1;

		if (nextPage > TOTAL_PAGES) {
			setPages((prev) => [...prev, nextPage].slice(1));
		}
		onPageChange(nextPage);
	};

	function handleClick(number: number) {
		onPageChange(number);
	}

	return (
		<div className={styles.pagination}>
			<div className={styles['page-numbers']}>
				{currentPage > 1 && (
					<button onClick={handlePrevPage}>
						<ChevronLeft />
					</button>
				)}

				{pages.map((number) => (
					<button
						className={currentPage === number ? styles.active : ''}
						key={number}
						onClick={() => handleClick(number)}
						disabled={number === currentPage}
					>
						{number}
					</button>
				))}

				<button onClick={handleNextPage}>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
}
