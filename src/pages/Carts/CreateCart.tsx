import React, { FormEvent } from 'react';
import { Cart, CartItemStatusType } from '../../types/api';

import { Button } from '../../components';
import CartItemObject from './CartItemObject';

import language from '../../assets/language';
import './styles.scss';

interface Props {
	draftCart: Cart

	onDraftCartTitleChange: (title: string) => void,

	onAddDraftCartItemClick: () => void,
	onRemoveDraftCartItemClick: (uuid: string) => void,
	onDraftCartItemTitleChange: (uuid: string, title: string) => void,
	onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType) => void,

	onCreateCartClick: () => void
}

const CreateCart = (props: Props) => {
	const {
		draftCart,
		onDraftCartTitleChange,
		onAddDraftCartItemClick,
		onRemoveDraftCartItemClick,
		onDraftCartItemTitleChange,
		onDraftCartItemStatusChange,
		onCreateCartClick,
	} = props;

	const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => onDraftCartTitleChange(e.currentTarget.value);
	const onCreateCartClicked = (e: FormEvent<HTMLFormElement>) => {
		onCreateCartClick();
		e.preventDefault();
	};

	const renderDraftCartItems = () => {
		return draftCart.items.map((item) => (
			<CartItemObject
				key={item.uuid}
				cartItem={item}
				onRemoveDraftCartItemClick={onRemoveDraftCartItemClick}
				onDraftCartItemTitleChange={onDraftCartItemTitleChange}
				onDraftCartItemStatusChange={onDraftCartItemStatusChange}
			/>
		));
	};

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

				<div className='create_cart__form__add_item_button' onClick={onAddDraftCartItemClick}>
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

export default CreateCart;
