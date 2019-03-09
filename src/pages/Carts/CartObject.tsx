import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AppState } from '../../types/store';
import { Cart, CartItem } from '../../types/api';

import { Button } from '../../components/Button';

import {
	setDraftCart,
	changeDraftCartTitle,
	addDraftCartItem,
	updateCart,
	removeCart,
	changeDraftCartItemTitle,
	changeDraftCartItemStatus,
} from '../../actions/carts';

import './styles.scss';

interface Props {
	dispatch: Function,

	cart: Cart,
	draftCart: Cart
}

const CartObject = (props: Props) => {
	const { dispatch, cart, draftCart } = props;

	const [isUpdating, setIsUpdating] = useState(false);
	const onCartClicked = () => {
		setIsUpdating(true);
		dispatch(setDraftCart(cart));
	};
	const onUpdateClicked = (e: FormEvent<HTMLFormElement>) => {
		dispatch(updateCart(draftCart));
		setIsUpdating(false);
		e.preventDefault();
	};
	const onRemoveCartClicked = () => dispatch(removeCart(cart));
	const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartTitle(e.currentTarget.value));
	const onAddDraftCartItemClicked = () => dispatch(addDraftCartItem());

	const renderItems = (status: string) => cart.items.filter(item => item.status === status).map(item => (
		<div key={item.uuid} className='cart_object__items__item'>
			<i
				className='material-icons create_cart__cart_item__close_button'
				children={item.status === 'active' ? 'check_box_outline_blank' : 'check_box'}
			/>
			<span className='cart_object__items__item__title'>{item.title}</span>
		</div>
	));

	const getUpdateCartForm = () => {
		const renderDraftCartItem = (cartItem: CartItem) => {
			const handleDraftCartItemTitleChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartItemTitle(cartItem.uuid, e.currentTarget.value));
			const handleDraftCartItemStatusChange = () => dispatch(changeDraftCartItemStatus(cartItem.uuid, cartItem.status === 'completed' ? 'active' : 'completed'));

			return (
				<div key={cartItem.uuid}>
					<i
						className='material-icons create_cart__cart_item__close_button'
						children={cartItem.status === 'active' ? 'check_box_outline_blank' : 'check_box'}
						onClick={handleDraftCartItemStatusChange}
					/>
					<input type='text' value={cartItem.title} onChange={handleDraftCartItemTitleChange}/>
				</div>
			);
		};

		return (
			<div className={classNames('cart_object__update_cart', { cart_object__update_cart_open: isUpdating })}>
				<form
					className={classNames('cart_object__update_cart__modal', { cart_object__update_cart__modal_open: isUpdating })}
					onSubmit={onUpdateClicked}>

					<input value={draftCart.title} onChange={handleDraftCartTitleChange}/>
					<input type='button' value='New Item' onClick={onAddDraftCartItemClicked}/>

					{draftCart.items.map(item => renderDraftCartItem(item))}

					<Button
						className='page_auth__action_auth_button'
						title='Update Cart'
						type='submit'
					/>
				</form>
			</div>
		);
	};

	return (
		<div className='cart_object'>
			<div className='cart_object__remove_button' onClick={onRemoveCartClicked}>
				<i className='material-icons'>cancel</i>
			</div>

			<h4 className='cart_object__title'>{cart.title}</h4>

			<div className='cart_object__items'>
				{renderItems('active')}
				{
					cart.items.filter(item => item.status == 'completed').length !== 0 &&
                    <div className='cart_object__items__separator'/>
				}
				{renderItems('completed')}
			</div>

			{getUpdateCartForm()}

			<button onClick={onCartClicked}>Click Cart</button>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { draftCart } = state.carts;

	return {
		draftCart,
	};
};


export default connect(mapStateToProps)(CartObject);
