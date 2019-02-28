import { navigator } from './navigator';

import { Register, Login, ConfirmEmail, ForgotPassword } from '../pages/Auth';
import { Carts } from '../pages/Carts';
import { NotFound, PrivacyPolicy, ServiceTerms } from '../pages/Other';

export const routes = {
	Register: { path: '/Account/Register', page: Register },
	Login: { path: '/Account/Login', page: Login },
	ConfirmEmail: { path: '/Account/ConfirmEmail', page: ConfirmEmail },
	ForgotPassword: { path: '/Account/ForgotPassword', page: ForgotPassword },

	Carts: { path: '/', page: Carts, options: { exact: true, authorized: true } },

	NotFound: { path: '*', page: NotFound },
	PrivacyPolicy: { path: '/About/PrivacyPolicy', page: PrivacyPolicy },
	ServiceTerms: { path: '/About/ServiceTerms', page: ServiceTerms },
};

export const AppNavigator = () => navigator(routes);
