import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart, CartItemStatusType } from '../../types/api';

import CreateCart from './CreateCart';
import UpdateCart from './UpdateCart';
import CartObject from './CartObject';

import {
	addDraftCartItem,
	changeDraftCartItemStatus,
	changeDraftCartItemTitle,
	changeDraftCartNotes,
	changeDraftCartTitle,
	clearDraftCart,
	createCart,
	fetchCarts,
	removeCart,
	removeDraftCartItem,
	setDraftCart,
	updateCart,
} from '../../actions/carts';
import { useLocalStorage } from '../../config/utilities';

interface Props {
	dispatch: Function,
	progress: AppState['service']['progress'],

	carts: Array<Cart>,
	draftCart: Cart,

	email?: string,

	isLoading: boolean,
	totalCount: number,
	pageNumber: number,
}

const Carts = (props: Props) => {
	const { dispatch, progress, carts, draftCart, isLoading, totalCount, pageNumber, email } = props;

	useEffect(() => {
		const { isLoggedIn } = useLocalStorage();
		if (isLoggedIn) dispatch(fetchCarts(false, 'merge', 1));
	}, []);

	useEffect(() => {
		const onScroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !isLoading && carts.length < totalCount)
				dispatch(fetchCarts(false, 'merge', pageNumber + 1));
		};

		window.addEventListener('scroll', onScroll, false);
		return () => {
			window.removeEventListener('scroll', onScroll, false);
		};
	}, []);

	const [isCartUpdating, setIsCartUpdating] = useState(false);

	const onOpenUpdateCartModalClicked = (cart: Cart) => {
		dispatch(setDraftCart(cart));
		setIsCartUpdating(true);
	};
	const onCloseUpdateCartModalClicked = () => {
		dispatch(clearDraftCart());
		setIsCartUpdating(false);
	};

	const onCreateCartClicked = () => {
		dispatch(createCart());
	};
	const onUpdateCartClicked = () => {
		dispatch(updateCart());
		setIsCartUpdating(false);
	};
	const onRemoveCartClicked = (cart: Cart) => {
		dispatch(removeCart(cart));
	};

	const onSetDraftCartClicked = (cart: Cart) => dispatch(setDraftCart(cart));
	const onClearDraftCartClicked = () => dispatch(clearDraftCart());

	const handleDraftCartTitleChange = (title: string) => dispatch(changeDraftCartTitle(title));
	const handleDraftCartNotesChange = (notes: string) => dispatch(changeDraftCartNotes(notes));

	const onAddDraftCartItemClicked = () => dispatch(addDraftCartItem());
	const onRemoveDraftCartItemClicked = (uuid: string) => dispatch(removeDraftCartItem(uuid));
	const handleDraftCartItemTitleChange = (uuid: string, title: string) => dispatch(changeDraftCartItemTitle(uuid, title));
	const handleDraftCartItemStatusChange = (uuid: string, status: CartItemStatusType) => dispatch(changeDraftCartItemStatus(uuid, status));

	const renderCarts = () => carts.map((cart) => (
		<CartObject
			key={cart.uuid}
			progress={progress}
			cart={cart}
			onOpenUpdateCartModalClick={onOpenUpdateCartModalClicked}
			onRemoveCartClick={onRemoveCartClicked}
			currentUserEmail={email}
		/>
	));

	const createCartDraftCart = isCartUpdating ? {
		id: '',
		title: '',
		notes: '',
		uuid: '',
		reminderDate: '',
		items: [],
		users: [],
	} : draftCart;
	return (
		<div>
			<CreateCart
				draftCart={createCartDraftCart}
				onDraftCartTitleChange={handleDraftCartTitleChange}
				onAddDraftCartItemClick={onAddDraftCartItemClicked}
				onRemoveDraftCartItemClick={onRemoveDraftCartItemClicked}
				onDraftCartItemTitleChange={handleDraftCartItemTitleChange}
				onDraftCartItemStatusChange={handleDraftCartItemStatusChange}
				onCreateCartClick={onCreateCartClicked}
			/>
			<UpdateCart
				draftCart={draftCart}

				onDraftCartTitleChange={handleDraftCartTitleChange}
				onDraftCartNotesChange={handleDraftCartNotesChange}

				onAddDraftCartItemClick={onAddDraftCartItemClicked}
				onRemoveDraftCartItemClick={onRemoveDraftCartItemClicked}
				onDraftCartItemTitleChange={handleDraftCartItemTitleChange}
				onDraftCartItemStatusChange={handleDraftCartItemStatusChange}

				isVisible={isCartUpdating}

				onCloseUpdateCartModalClick={onCloseUpdateCartModalClicked}
				onUpdateCartClick={onUpdateCartClicked}
			/>
			{renderCarts()}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { progress } = state.service;
	const { email } = state.profile;

	const { carts, draftCart, isLoading, totalCount, pageNumber } = state.carts;
	return {
		progress,
		email,

		carts,
		draftCart,

		isLoading,
		totalCount,
		pageNumber,
	};
};

export default connect(mapStateToProps)(Carts);
