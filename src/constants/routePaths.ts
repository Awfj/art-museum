const DETAIL_INFO_BASE = '/detail-info';
export const ROUTE_PATHS = {
	HOME: '/',
	FAVORITES: '/favorites',
	ARTWORK: {
		DETAIL_INFO: `${DETAIL_INFO_BASE}/:id`,
		getDetailInfoPath: (id: string) => `${DETAIL_INFO_BASE}/${id}`,
	},
	NOT_FOUND: '*',
};
