import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store';

import './index.css';

import DetailInfo from '@/pages/DetailInfo/';
import Error from '@/pages/Error/';
import Favorites from '@/pages/Favorites/';
import Home from '@/pages/Home/';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ErrorBoundary FallbackComponent={Error}>
				<Home />
			</ErrorBoundary>
		),
		errorElement: <Error />,
	},
	{
		path: '/favorites',
		element: (
			<ErrorBoundary FallbackComponent={Error}>
				<Favorites />
			</ErrorBoundary>
		),
		errorElement: <Error />,
	},
	{
		path: '/detail-info/:id',
		element: (
			<ErrorBoundary FallbackComponent={Error}>
				<DetailInfo />
			</ErrorBoundary>
		),
		errorElement: <Error />,
	},
	{
		path: '*',
		element: <Error />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
