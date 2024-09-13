import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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
		element: <Home />,
		errorElement: <Error />,
	},
	{
		path: '/favorites',
		element: <Favorites />,
	},
	{
		path: '/detail-info/:id',
		element: <DetailInfo />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
