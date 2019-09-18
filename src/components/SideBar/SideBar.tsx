import React from 'react';

import './style.scss';
import { RouteName } from '../../types/store';

interface Props {
		isShow?: boolean,
		onNavigate: (routeName: RouteName) => void,
		selectedRoute?: RouteName
}

const SideBar = (props: Props) => {
		const { isShow, selectedRoute, onNavigate } = props;

		return (
				<div className={isShow ? 'sidebar_open' : 'sidebar'}>
						<ul className="menu">
								<li onClick={() => {
										onNavigate('Carts');
								}} className={selectedRoute === 'Carts' ? 'selected' : ''}><a>
										<i className='material-icons'>view_day</i>
										<span>Carts</span></a></li>
								<li onClick={() => {
										onNavigate('ArchivedCarts');
								}} className={selectedRoute === 'ArchivedCarts' ? 'selected' : ''}><a>
										<i className='material-icons'>archive</i>
										<span>Archived Carts</span></a>
								</li>
						</ul>
				</div>
		);
};

export default SideBar;

