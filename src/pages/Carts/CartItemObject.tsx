import React, { FormEvent, useEffect, useRef } from 'react';
import { CartItem, CartItemStatusType } from '../../types/api';
import language from '../../assets/language';

interface Props {
	onDraftCartItemTitleChange: (uuid: string, title: string) => void,
	onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType) => void,
	onRemoveDraftCartItemClick: (uuid: string) => void,

	cartItem: CartItem
}

const CartItemObject = (props: Props) => {
	const { cartItem, onDraftCartItemTitleChange, onDraftCartItemStatusChange, onRemoveDraftCartItemClick } = props;
	const { uuid, title, status } = cartItem;

	const itemNameRef: React.RefObject<HTMLInputElement> = useRef<any>();

	useEffect(() => {
		if (itemNameRef.current) {
			itemNameRef.current.focus();
		}
	}, []);

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
				ref={itemNameRef}
				className='cart_item_object__title_input'
				value={title}
				onChange={handleDraftCartItemTitleChange}
				type='text'
				placeholder={language.textEnterCartItemTitle}
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

