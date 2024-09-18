import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SearchIcon } from 'lucide-react';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './styles.module.css';

import PageHeading from '@/components/PageHeading';
import { initiateNewSearch } from '@/store/reducers/artworkSlice';
import { AppDispatch } from '@/types/store';
import { debouncedSubmit } from '@/utils/form';

export default function Search() {
	const dispatch: AppDispatch = useDispatch();

	const searchSchema = useMemo(
		() =>
			object({
				searchTerm: string().required('Please enter a search term'),
			}),
		[]
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(searchSchema),
	});

	const submitForm = useCallback(
		(data: { searchTerm: string }) => {
			dispatch(initiateNewSearch());
			debouncedSubmit(data, dispatch);
		},
		[dispatch]
	);

	return (
		<section className={styles.search}>
			<PageHeading>
				let's find some <span className={styles['word-emphasis']}>art</span>{' '}
				here!
			</PageHeading>

			<form
				onSubmit={handleSubmit(submitForm)}
				className={styles['search-form']}
			>
				<input
					className={styles['form-input']}
					type="text"
					{...register('searchTerm')}
					placeholder="Search Art, Artist, Work..."
				/>
				<button type="submit" className={styles['form-button']}>
					<SearchIcon />
				</button>
			</form>
			<p className={styles.error}>{errors.searchTerm?.message}</p>
		</section>
	);
}
