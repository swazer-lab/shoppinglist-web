import React from 'react';

import './style.scss';
import { RouteName } from '../../types/store';

interface Props {
		isOpen?: boolean,
		onNavigate: (routeName: RouteName) => void,
		selectedRoute?: RouteName
		routes?: { RouteName: RouteName, Icon: string, Text: string }[]
}

const SideBar = (props: Props) => {
		const { isOpen, selectedRoute, routes, onNavigate } = props;

		const mapRoutes = () => routes!.map((route, index) => (
				<li key={index} onClick={() => onNavigate(route.RouteName)}
				    className={selectedRoute === route.RouteName ? 'selected' : ''}>
						<a>
								<i className='material-icons'>{route.Icon}</i>
								<span>{route.Text}</span>
						</a>
				</li>
		));

		return (
						<div className={isOpen ? 'sidebar sidebar__open' : 'sidebar'}>
								<ul className="menu">
										{mapRoutes()}
								</ul>
						</div>
		);
};

export default SideBar;

