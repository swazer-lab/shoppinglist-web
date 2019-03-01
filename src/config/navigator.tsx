import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory({});
const routes: any = {};

export const getHistory = () => history;
export const getRoutes = () => routes;

export const createStackNavigator = (stacks: any) => {
	const appStacks = Object.keys(stacks).map((stackName: string) => {
		const stack = stacks[stackName];
		const stackOptions = stack.stackOptions ? stack.stackOptions : {};

		const appRoutes = Object.keys(stack).map((routeName: string) => {
			if (routeName === 'stackOptions') return;

			const route = stack[routeName];
			const routePath = !route.path ? undefined : !stackOptions.path ? route.path : stackOptions.path.concat(route.path);
			const routeOptions = route.routeOptions ? route.routeOptions : {};

			routes[routeName] = { ...route, path: routePath, routeOptions };
			return (
				<Route
					key={routeName}
					path={routePath}
					component={route.page}
					{...routeOptions}
				/>
			);
		});

		const getLayoutOptions = () => {
			let currentRoute: any;
			Object.keys(routes).map((routeName: string) => {
				const route = routes[routeName];
				if (route.path === history.location.pathname) currentRoute = route;
			});

			const routeLayoutOptions = (currentRoute && currentRoute.layoutOptions) ? currentRoute.layoutOptions : {};
			const pageLayoutOptions = (currentRoute && currentRoute.page && currentRoute.page.layoutOptions) ? currentRoute.page.layoutOptions : {};

			return { ...routeLayoutOptions, ...pageLayoutOptions };
		};

		const Div = ({ children }: { children: any }) => <div>{children}</div>;
		const Layout = (stackOptions && stackOptions.layout) ? stackOptions.layout : Div;
		return (
			<Route kye={stackName}>
				<Layout
					history={history}
					layoutOptions={getLayoutOptions}>

					{appRoutes}
				</Layout>
			</Route>
		);
	});

	return (
		<Router history={history}>
			<Switch>
				<div>
					{appStacks}
				</div>
			</Switch>
		</Router>
	);
};
