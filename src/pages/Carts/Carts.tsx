import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart, CartItemStatusType } from '../../types/api';

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
	clearDraftCart,
	createCart,
	fetchCarts,
	pullCart,
	pushCart,
	removeCart,
	removeDraftCartItem,
	setDraftCart,
	updateCart,
} from '../../actions/carts';

import language from '../../assets/language';

interface Props {
	dispatch: Function,
	progress: AppState['service']['progress'],
	snackbar: AppState['service']['snackbar'],

	carts: Array<Cart>,
	draftCart: Cart,

	email?: string,

	isLoading: boolean,
	totalCount: number,
	pageNumber: number,
}

interface State {
	isCartUpdating: boolean,
}

class Carts extends React.Component<Props, State> {
	static layoutOptions = {
		title: 'Carts',
	};

	constructor(props: Props) {
		super(props);
		this.state = { isCartUpdating: false };
	}

	componentDidMount(): void {
		this.props.dispatch(fetchCarts(false, 'replace', 1));
		document.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(): void {
		document.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		const { dispatch, carts, isLoading, totalCount, pageNumber } = this.props;
		const reachedEnd = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
		const shouldFetchCarts = !isLoading && carts.length < totalCount;

		if (reachedEnd && shouldFetchCarts) {
			dispatch(fetchCarts(false, 'merge', pageNumber + 1));
		}
	};

	setIsCartUpdating = (value: boolean): void => {
		this.setState({ isCartUpdating: value });
	};

	render() {
		const { dispatch, progress, snackbar, carts, draftCart, email } = this.props;
		const { isCartUpdating } = this.state;

		const onOpenUpdateCartModalClicked = (cart: Cart) => {
			dispatch(setDraftCart(cart));
			this.setIsCartUpdating(true);
		};
		const onCloseUpdateCartModalClicked = () => {
			dispatch(clearDraftCart());
			this.setIsCartUpdating(false);
		};

		const onCreateCartClicked = () => {
			dispatch(createCart());
		};
		const onUpdateCartClicked = () => {
			dispatch(updateCart());
			this.setIsCartUpdating(false);
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

				dispatch(pushCart(cartIndex, cart));
				dispatch(hideSnackbar());
			};

			dispatch(showSnackbar(language.textRemovingCart, [{
				title: language.actionUndo,
				onClick: onUndoClicked,
			}]));

			setTimeout(() => {
				if (!isUndoClicked) {
					dispatch(removeCart(cart));
				}
			}, 3000);
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
	}

}

const mapStateToProps = (state: AppState) => {
	const { progress, snackbar } = state.service;
	const { email } = state.profile;

	const { carts, draftCart, isLoading, totalCount, pageNumber } = state.carts;
	return {
		progress,
		snackbar,
		email,

		carts,
		draftCart,

		isLoading,
		totalCount,
		pageNumber,
	};
};

export default connect(mapStateToProps)(Carts);
