import React, { FormEvent } from 'react';
import classNames from 'classnames';

import { Cart, CartItem, CartItemStatusType } from '../../types/api';

import { Button } from '../../components/Button';
import language from '../../assets/language';

import './styles.scss';

interface Props {
	draftCart: Cart,

	onDraftCartTitleChange: (title: string) => void,
	onDraftCartNotesChange: (notes: string) => void,

	onAddDraftCartItemClick: () => void,
	onRemoveDraftCartItemClick: (uuid: string) => void,
	onDraftCartItemTitleChange: (uuid: string, title: string) => void,
	onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType) => void,

	isVisible: boolean,

	onCloseUpdateCartModalClick: () => void,
	onUpdateCartClick: () => void,
}

const UpdateCart = (props: Props) => {
	const {
		draftCart,

		onDraftCartTitleChange,

		onCloseUpdateCartModalClick,

		onAddDraftCartItemClick,
		onRemoveDraftCartItemClick,
		onDraftCartItemTitleChange,
		onDraftCartItemStatusChange,

		isVisible,
		onUpdateCartClick,
	} = props;

	const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => onDraftCartTitleChange(e.currentTarget.value);

	const onAddDraftCartItemClicked = () => onAddDraftCartItemClick();
	const onCloseUpdateCartModalClicked = () => onCloseUpdateCartModalClick();

	const onUpdateCartClicked = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onUpdateCartClick();
	};

	const renderDraftCartItem = (cartItem: CartItem) => {
		const { uuid, title, status } = cartItem;

		const handleDraftCartItemTitleChange = (e: FormEvent<HTMLInputElement>) => onDraftCartItemTitleChange(uuid, e.currentTarget.value);
		const handleDraftCartItemStatusChange = () => onDraftCartItemStatusChange(uuid, status === 'completed' ? 'active' : 'completed');
		const onRemoveDraftCartItemClicked = () => onRemoveDraftCartItemClick(uuid);

		return (
			<div key={cartItem.uuid} className='update_cart__cart_item'>
				<i className='material-icons update_cart__cart_item__close_button'
				   onClick={handleDraftCartItemStatusChange}
				   children={status === 'active' ? 'check_box_outline_blank' : 'check_box'}
				/>
				<input
					className='update_cart__cart_item__title_input'
					value={title}
					onChange={handleDraftCartItemTitleChange}
					type='text'
					placeholder='Item Name'
					required
				/>
				<i className='material-icons update_cart__cart_item__close_button'
				   onClick={onRemoveDraftCartItemClicked}
				   children='close'
				/>
			</div>
		);
	};

	const { title, items } = draftCart;
	return (
		<div className={classNames('cart_object__update_cart', { cart_object__update_cart_open: isVisible })}
		     onClick={onCloseUpdateCartModalClicked}>
			<div className='update_cart'>
				<form
					className={classNames('update_cart__form cart_object__update_cart__modal', { cart_object__update_cart__modal_open: isVisible })}
					onSubmit={onUpdateCartClicked}
					onClick={(e: any) => e.stopPropagation()}>

					<input
						className='update_cart__form__title_input'
						type='text'
						placeholder={language.textEnterCartTitle}
						value={title}
						onChange={handleDraftCartTitleChange}
						required
					/>

					<div className='update_cart__form__cart_items'>
						{items.map(item => renderDraftCartItem(item))}
					</div>

					<div className='update_cart__form__add_item_button' onClick={onAddDraftCartItemClicked}>
						<i className='material-icons update_cart__cart_item__close_button'
						   children='add'
						/>
						<span>{language.actionAddCartItem}</span>
					</div>

					<Button
						className='update_cart__form__submit_button'
						type='submit'
						title={language.actionUpdateCart}
					/>
				</form>
			</div>
		</div>
	);
};

export default UpdateCart;
