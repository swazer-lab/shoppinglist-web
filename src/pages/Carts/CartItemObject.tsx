import * as React from 'react';
import { CartItem, CartItemStatusType } from '../../types/api';

interface Props {
	cartItem: CartItem,

	onDraftCartItemTitleChange: (uuid: string, title: string) => void,
	onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType) => void,
	onRemoveDraftCartItemClick: (uuid: string) => void,
}

const CartItemObject = (props: Props) => {
	const { uuid, title } = props.cartItem;

	const handleCartItemTitleChange = (e: any) => props.onDraftCartItemTitleChange(uuid, e.target.value);
	const handleCartItemStatusChange = (e: any) => props.onDraftCartItemStatusChange(uuid, e.target.checked ? 'completed' : 'active');
	const onRemoveDraftCartItemClicked = () => props.onRemoveDraftCartItemClick(uuid);

	return (
		<fieldset>
			<input type='checkbox' onChange={handleCartItemStatusChange} />
			<input type='text' value={title} onChange={handleCartItemTitleChange} />

			<input type='button' value='X' onClick={onRemoveDraftCartItemClicked} />
		</fieldset>
	);
};

export default CartItemObject;
