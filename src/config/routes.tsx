import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import { Route as RouteType } from '../types/store';
import { Layout } from '../layout';

import { Landing } from '../pages/Landing';
import { ConfirmEmail, ForgotPassword, Login, Register } from '../pages/Auth';
import { Carts, GetAccess } from '../pages/Carts';
import { NotFound, PrivacyPolicy, ServiceTerms } from '../pages/Other';

export const routes: RouteType[] = [
	{ name: 'Landing', path: '/', Component: Landing },
	{ name: 'Register', path: '/account/register', Component: Register },
	{ name: 'Login', path: '/account/login', Component: Login },
	{ name: 'ConfirmEmail', path: '/account/confirmEmail', Component: ConfirmEmail },
	{ name: 'ForgotPassword', path: '/account/forgotPassword', Component: ForgotPassword },
	{ name: 'Carts', path: '/carts', Component: Carts },
	{ name: 'GetAccess', path: '/cart/getAccess/:id', Component: GetAccess },
	{ name: 'PrivacyPolicy', path: '/privacyPolicy', Component: PrivacyPolicy },
	{ name: 'ServiceTerms', path: '/serviceTerms', Component: ServiceTerms },
];

export const history = createBrowserHistory({});

export const AppNavigator = () => {
	const renderRoutes = routes.map(({ name, path, Component }: RouteType) => {
		const routeComponent = (props: any) => (
			<Layout layoutOptions={(Component.layoutOptions ? Component.layoutOptions : {})} {...props}>
				<Component />
			</Layout>
		);
		return (
			<Route
				key={name}
				path={path}
				component={routeComponent}
				exact={name === 'Landing'}
			/>
		);
	});

	return (
		<Router history={history}>
			<Switch>
				{renderRoutes}
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
};
