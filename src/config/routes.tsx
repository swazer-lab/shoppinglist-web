import React from 'react';

import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Layout } from '../layout';

import { Landing } from '../pages/Landing';
import { ConfirmEmail, ForgotPassword, Login, Register } from '../pages/Auth';
import { Carts, GetAccess } from '../pages/Carts';
import { NotFound, PrivacyPolicy, ServiceTerms } from '../pages/Other';

export const routes = {
	landing: { path: '/', component: Landing },

	register: { path: '/account/register', component: Register },
	login: { path: '/account/login', component: Login },
	confirmEmail: { path: '/account/confirmEmail', component: ConfirmEmail, layoutOptions: { authorized: true } },
	forgotPassword: { path: '/account/forgotPassword', component: ForgotPassword },

	carts: { path: '/carts', component: Carts, layoutOptions: { authorized: true } },
	getAccess: { path: '/cart/getAccess/:id', component: GetAccess },

	privacyPolicy: { path: '/privacyPolicy', component: PrivacyPolicy },
	serviceTerms: { path: '/serviceTerms', component: ServiceTerms },
};

export const history = createBrowserHistory({});

export const AppNavigator = () => {
	const withMainLayout = (route: any) => {
		const routeLayoutOptions = route.layoutOptions ? route.layoutOptions : {};
		const pageLayoutOptions = route.component.layoutOptions ? route.component.layoutOptions : {};

		return () => (
			<Layout layoutOptions={{ ...routeLayoutOptions, ...pageLayoutOptions }}>
				<route.component />
			</Layout>
		);
	};

	return (
		<Router history={history}>
			<Switch>
				<Route path={routes.landing.path} component={routes.landing.component} exact />

				<Route path={routes.register.path} component={routes.register.component} />
				<Route path={routes.login.path} component={routes.login.component} />
				<Route path={routes.confirmEmail.path} component={routes.confirmEmail.component} />
				<Route path={routes.forgotPassword.path} component={routes.forgotPassword.component} />

				<Route path={routes.carts.path} component={withMainLayout(routes.carts)} />
				<Route path={routes.getAccess.path} component={routes.getAccess.component} />

				<Route path={routes.privacyPolicy.path} component={routes.privacyPolicy.component} />
				<Route path={routes.serviceTerms.path} component={routes.serviceTerms.component} />

				<Route component={NotFound} />
			</Switch>
		</Router>
	);
};
