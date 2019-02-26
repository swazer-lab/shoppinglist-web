import { navigator } from './navigator';

import { Register, Login } from '../pages/Auth';
import { Carts } from '../pages/Carts';
import { NotFound, PrivacyPolicy, ServiceTerms } from '../pages/Other';

export const routes = {
	Register: { path: '/Account/Register', page: Register },
	Login: { path: '/Account/Login', page: Login },

	Carts: { path: '/', page: Carts, options: { exact: true } },

	NotFound: { path: '*', page: NotFound },
	PrivacyPolicy: { path: '/About/PrivacyPolicy', page: PrivacyPolicy },
	ServiceTerms: { path: '/About/ServiceTerms', page: ServiceTerms },
};

export const AppNavigator = () => navigator(routes);
