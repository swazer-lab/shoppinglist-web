import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart } from '../../types/api';

import CreateCart from './CreateCart';
import CartObject from './CartObject';

import { fetchCarts } from '../../actions/carts';
import { useLocalStorage } from '../../config/utilities';

interface Props {
	dispatch: Function,
	isLoggedIn: boolean,

	carts: Array<Cart>,

	isLoading: boolean,
	totalCount: number,
	pageNumber: number,
}

const Carts = (props: Props) => {
	useEffect(() => {
		const { dispatch, isLoggedIn } = props;
		if (isLoggedIn) dispatch(fetchCarts(false, 'merge', 1));
	}, []);

	useEffect(() => {
		const { dispatch, carts, isLoading, totalCount, pageNumber } = props;

		const onScroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !isLoading && carts.length < totalCount)
				dispatch(fetchCarts(true, 'merge', pageNumber + 1));
		};

		window.addEventListener('scroll', onScroll, false);
		return () => {
			window.removeEventListener('scroll', onScroll, false);
		};
	});

	const renderCarts = () => props.carts.map(cart => (
		<CartObject key={cart.uuid} cart={cart} />
	));

	return (
		<div>
			<CreateCart />
			{renderCarts()}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { isLoggedIn } = useLocalStorage();
	const { carts, isLoading, totalCount, pageNumber } = state.carts;

	return {
		isLoggedIn,

		carts,

		isLoading,
		totalCount,
		pageNumber,
	};
};

export default connect(mapStateToProps)(Carts);
