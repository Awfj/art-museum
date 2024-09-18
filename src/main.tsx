import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store';

import './index.css';

import { ROUTE_PATHS } from '@/constants/routePaths';
import DetailInfo from '@/pages/DetailInfo/';
import Error from '@/pages/Error/';
import Favorites from '@/pages/Favorites/';
import Home from '@/pages/Home/';

const router = createBrowserRouter([
	{
		path: ROUTE_PATHS.HOME,
		element: (
			<ErrorBoundary FallbackComponent={Error}>
				<Home />
			</ErrorBoundary>
		),
		errorElement: <Error />,
	},
	{
		path: ROUTE_PATHS.FAVORITES,
		element: (
			<ErrorBoundary FallbackComponent={Error}>
				<Favorites />
			</ErrorBoundary>
		),
		errorElement: <Error />,
	},
	{
		path: ROUTE_PATHS.ARTWORK.DETAIL_INFO,
		element: (
			<ErrorBoundary FallbackComponent={Error}>
				<DetailInfo />
			</ErrorBoundary>
		),
		errorElement: <Error />,
	},
	{
		path: ROUTE_PATHS.NOT_FOUND,
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
