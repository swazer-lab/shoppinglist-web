import React, { FormEvent } from 'react';
import { CartItem, CartItemStatusType } from '../../types/api';

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
		<div key={uuid} className='cart_item_object'>
			<i className='material-icons cart_item_object__close_button'
			   onClick={handleDraftCartItemStatusChange}
			   children={status === 'completed' ? 'check_box' : 'check_box_outline_blank'}
			/>
			<input
				className='cart_item_object__title_input'
				value={title}
				onChange={handleDraftCartItemTitleChange}
				type='text'
				placeholder='Item Name'
				required
			/>
			<i className='material-icons cart_item_object__close_button'
			   onClick={onRemoveDraftCartItemClicked}
			   children='close'
			/>
		</div>
	);
};

export default CartItemObject;

