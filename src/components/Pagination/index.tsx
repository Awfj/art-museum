import { ChevronRight } from 'lucide-react';

import styles from './styles.module.css';

type PaginationProps = {
	length: number;
	currentPage: number;
	onPageChange: (pageNumber: number) => void;
};

export default function Pagination({
	length,
	currentPage,
	onPageChange,
}: PaginationProps) {
	const pageNumbers = Array.from({ length }, (_, i) => i + 1);

	const handleNextPage = () => {
		if (currentPage < length) {
			onPageChange(currentPage + 1);
		} else {
			onPageChange(1);
		}
	};

	return (
		<div className={styles.pagination}>
			<div className={styles['page-numbers']}>
				{pageNumbers.map((number) => (
					<button
						className={currentPage === number ? styles.active : ''}
						key={number}
						onClick={() => onPageChange(number)}
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
