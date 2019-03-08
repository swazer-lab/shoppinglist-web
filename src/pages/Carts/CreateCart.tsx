import React, { FormEvent } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart } from '../../types/api';

import { Button } from '../../components';

import {
	addDraftCartItem,
	changeDraftCartItemStatus,
	changeDraftCartItemTitle,
	changeDraftCartTitle, createCart,
	removeDraftCartItem,
} from '../../actions/carts';

import './styles.scss';
import language from '../../assets/language';

interface Props {
	dispatch: Function,
	draftCart: Cart
}

const CreateCart = (props: Props) => {
	const { dispatch, draftCart } = props;

	const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartTitle(e.currentTarget.value));
	const onAddDraftCartItemClicked = () => dispatch(addDraftCartItem());

	const onCreateCartClicked = (e: FormEvent<HTMLFormElement>) => {
		dispatch(createCart());
		e.preventDefault();
	};

	const renderDraftCartItems = () => draftCart.items.map(item => {
		const { uuid, title, status } = item;

		const handleDraftCartItemTitleChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartItemTitle(uuid, e.currentTarget.value));
		const handleDraftCartItemStatusChange = () => dispatch(changeDraftCartItemStatus(uuid, status === 'active' ? 'completed' : 'active'));

		const onRemoveDraftCartItemClicked = () => dispatch(removeDraftCartItem(uuid));

		return (
			<div key={item.uuid} className='create_cart__cart_item'>
				<i className='material-icons create_cart__cart_item__close_button'
				   onClick={handleDraftCartItemStatusChange}
				   children={status === 'active' ? 'check_box_outline_blank' : 'check_box'}
				/>
				<input
					className='create_cart__cart_item__title_input'
					value={title}
					onChange={handleDraftCartItemTitleChange}
					type='text'
					placeholder='Item Name'
					required
				/>

				<i className='material-icons create_cart__cart_item__close_button'
				   onClick={onRemoveDraftCartItemClicked}
				   children='close'
				/>
			</div>
		);
	});

	return (
		<div className='create_cart'>
			<form className='create_cart__form' onSubmit={onCreateCartClicked}>
				<input
					className='create_cart__form__title_input'
					type='text'
					placeholder={language.textEnterCartTitle}
					value={draftCart.title}
					onChange={handleDraftCartTitleChange}
					required
				/>

				<div className='create_cart__form__cart_items'>
					{renderDraftCartItems()}
				</div>

				<div className='create_cart__form__add_item_button' onClick={onAddDraftCartItemClicked}>
					<i className='material-icons create_cart__cart_item__close_button'
					   children='add'
					/>
					<span>{language.actionAddCartItem}</span>
				</div>

				<Button
					className='create_cart__form__submit_button'
					type='submit'
					title={language.actionCreateCart}
				/>
			</form>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { draftCart } = state.carts;

	return {
		draftCart,
	};
};

export default connect(mapStateToProps)(CreateCart);
