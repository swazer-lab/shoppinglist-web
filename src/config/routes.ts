import { navigator } from './navigator';

import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import Carts from '../pages/Carts/Carts';

import NotFound from '../pages/Other/NotFound';

const routes = {
	Landing: {
		path: '/',
		page: Landing,

		options: {
			exact: true,
		},
	},
	Login: {
		path: '/Account/Login',
		page: Login,
	},
	Carts: {
		path: '/Carts',
		page: Carts,
	},

	NotFound: { path: '*', page: NotFound },
};

export const AppNavigator = () => navigator(routes);
