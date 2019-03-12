import React, { FormEvent } from 'react';
import { CartItemStatusType, CartItem } from '../../types/api';

interface Props {
	onDraftCartItemTitleChange: (uuid: string, title: string) => void,
	onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType) => void,
	onRemoveDraftCartItemClick: (uuid: string) => void,

	cartItem: CartItem
}

const CartItemObject = (props: Props) => {
	const { cartItem, onDraftCartItemTitleChange, onDraftCartItemStatusChange, onRemoveDraftCartItemClick } = props;
	const { uuid, title, status } = cartItem;

	const handleDraftCartItemTitleChange = (e: FormEvent<HTMLInputElement>) => onDraftCartItemTitleChange(uuid, e.currentTarget.value);
	const handleDraftCartItemStatusChange = () => onDraftCartItemStatusChange(uuid, status === 'completed' ? 'active' : 'completed');
	const onRemoveDraftCartItemClicked = () => onRemoveDraftCartItemClick(uuid);

	return (
		<div key={uuid} className='update_cart__cart_item'>
			<i className='material-icons update_cart__cart_item__close_button'
			   onClick={handleDraftCartItemStatusChange}
			   children={status === 'completed' ? 'check_box' : 'check_box_outline_blank'}
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

export default CartItemObject;

