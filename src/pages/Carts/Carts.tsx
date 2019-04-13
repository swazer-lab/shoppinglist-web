import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { AppState } from '../../types/store';
import { Cart, CartItemStatusType } from '../../types/api';
import { VisibilityFilter } from '../../types/carts';

import CreateCart from './CreateCart';
import UpdateCart from './UpdateCart';
import CartObject from './CartObject';

import { hideSnackbar, showSnackbar } from '../../actions/service';
import {
	addDraftCartItem,
	changeDraftCartItemStatus,
	changeDraftCartItemTitle,
	changeDraftCartNotes,
	changeDraftCartTitle,
	changeVisibilityFilter,
	clearDraftCart,
	createCart,
	fetchCarts,
	pullCart,
	pushCart,
	removeCart,
	removeDraftCartItem,
	reorderCart,
	setDraftCart,
	updateCart,
} from '../../actions/carts';

import language from '../../assets/language';
import { getCartStatus } from '../../config/utilities';
import { Button } from '../../components/Button';

interface Props {
	dispatch: Function,
	progress: AppState['service']['progress'],
	snackbar: AppState['service']['snackbar'],

	carts: Array<Cart>,
	draftCart: Cart,

	visibilityFilter: VisibilityFilter,

	email?: string,

	isLoading: boolean,
	totalCount: number,
	pageNumber: number,

	isLoggedIn: boolean,
	accessToken: string
}

const Carts = (props: Props) => {
	const { dispatch, progress, snackbar, carts, draftCart, email, visibilityFilter, isLoggedIn, accessToken } = props;

	const [isCartUpdating, setIsCartUpdating] = useState(false);

	useEffect(() => {
		if (isLoggedIn && accessToken) {
			dispatch(fetchCarts(false, 'replace', 1));
		}
	}, [isLoggedIn, accessToken]);

	useEffect(() => {
		const handleScroll = () => {
			const { dispatch, carts, isLoading, totalCount, pageNumber } = props;
			const reachedEnd = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
			const shouldFetchCarts = !isLoading && carts.length < totalCount;

			if (reachedEnd && shouldFetchCarts) {
				dispatch(fetchCarts(false, 'merge', pageNumber + 1));
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

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
		if (snackbar.visible) {
			dispatch(hideSnackbar());
		}

		const cartIndex = carts.indexOf(cart);
		dispatch(pullCart(cartIndex));

		let isUndoClicked = false;

		const onUndoClicked = () => {
			isUndoClicked = true;
			dispatch(hideSnackbar());
			dispatch(pushCart(cartIndex, cart));
		};

		dispatch(showSnackbar(language.textRemovingCart, [{
			title: language.actionUndo,
			onClick: onUndoClicked,
		}]));

		setTimeout(() => {
			if (!isUndoClicked) {
				dispatch(hideSnackbar());
				dispatch(removeCart(cart));
			}
		}, 3000);
	};

	const handleDraftCartTitleChange = (title: string) => dispatch(changeDraftCartTitle(title));
	const handleDraftCartNotesChange = (notes: string) => dispatch(changeDraftCartNotes(notes));

	const onAddDraftCartItemClicked = () => dispatch(addDraftCartItem());
	const onRemoveDraftCartItemClicked = (uuid: string) => dispatch(removeDraftCartItem(uuid));
	const handleDraftCartItemTitleChange = (uuid: string, title: string) => dispatch(changeDraftCartItemTitle(uuid, title));
	const handleDraftCartItemStatusChange = (uuid: string, status: CartItemStatusType) => dispatch(changeDraftCartItemStatus(uuid, status));

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;
		if (!destination) {
			return;
		}
		if (destination.index === source.index) {
			return;
		}

		const { dispatch, carts } = props;
		const cartId = carts[source.index].id;
		dispatch(reorderCart(cartId, source.index, destination.index));
	};

	const onGetAllCarts = () => {
		dispatch(changeVisibilityFilter(VisibilityFilter.all));
	};

	const onGetActiveCarts = () => {
		dispatch(changeVisibilityFilter(VisibilityFilter.active));
	};

	const onGetCompletedCarts = () => {
		dispatch(changeVisibilityFilter(VisibilityFilter.completed));
	};

	const renderCarts = () => carts.map((cart, index) => (
		<Draggable key={cart.id} draggableId={cart.id} index={index}>
			{provided => (
				<div className='cart_object_container'
				     ref={provided.innerRef}
				     {...provided.draggableProps}
				     {...provided.dragHandleProps}
				>
					{visibilityFilter === 'All' || getCartStatus(cart.items) === visibilityFilter ?
						<CartObject
							key={cart.uuid}
							progress={progress}
							cart={cart}
							onOpenUpdateCartModalClick={onOpenUpdateCartModalClicked}
							onRemoveCartClick={onRemoveCartClicked}
							currentUserEmail={email}
						/> : null
					}
				</div>
			)}
		</Draggable>
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
		<div className='carts_container'>
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

			<div className='filter_cart'>
				<Button
					type='button'
					accentColor={visibilityFilter === 'All' ? 'primary' : 'white'}
					title='All'
					onClick={onGetAllCarts}
					className='filter_cart__filter_button'
				/>
				<Button
					type='button'
					accentColor={visibilityFilter === 'Active' ? 'primary' : 'white'}
					title='Active' onClick={onGetActiveCarts}
					className='filter_cart__filter_button'
				/>
				<Button
					type='button'
					accentColor={visibilityFilter === 'Completed' ? 'primary' : 'white'}
					title='Completed' onClick={onGetCompletedCarts}
					className='filter_cart__filter_button'
				/>
			</div>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="list">
					{provided => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{renderCarts()}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

Carts.layoutOptions = {
	title: 'Carts',
	layout: 'Main',
	authorized: true,
};

const mapStateToProps = (state: AppState) => {
	const { progress, snackbar } = state.service;
	const { email } = state.profile;
	const { isLoggedIn, accessToken } = state.storage;

	const { carts, draftCart, isLoading, totalCount, pageNumber, visibilityFilter } = state.carts;

	return {
		progress,
		snackbar,
		email,

		carts,

		draftCart,
		visibilityFilter,

		isLoading,
		totalCount,
		pageNumber,

		isLoggedIn,
		accessToken,
	};
};

export default connect(mapStateToProps)(Carts);
