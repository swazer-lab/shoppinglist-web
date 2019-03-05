import { createStackNavigator } from './navigator';

import { Layout } from '../layout';

import { Register, Login, ConfirmEmail, ForgotPassword } from '../pages/Auth';
import { Carts } from '../pages/Carts';
import { PrivacyPolicy, ServiceTerms } from '../pages/Other';

export const routes = {
	account: {
		Register: {
			path: '/register',
			page: Register,
		},
		Login: {
			path: '/login',
			page: Login,
		},
		ConfirmEmail: {
			path: '/confirmEmail',
			page: ConfirmEmail,
		},
		ForgotPassword: {
			path: '/forgotPassword',
			page: ForgotPassword,
		},

		stackOptions: {
			path: '/account',
			index: Register,
		},
	},

	carts: {
		Carts: {
			path: '/',
			page: Carts,
			routeOptions: {
				exact: true,
				authorized: true,
			},
		},

		stackOptions: {
			path: '/carts',
			index: Carts,
			layout: Layout,
		},
	},

	more: {
		PrivacyPolicy: {
			path: '/PrivacyPolicy',
			page: PrivacyPolicy,
		},
		ServiceTerms: {
			path: '/ServiceTerms',
			page: ServiceTerms,
		},
	},
};

export const AppNavigator = () => createStackNavigator(routes);
