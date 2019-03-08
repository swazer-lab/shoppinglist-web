import React from 'react';
import { Cart } from '../../types/api';

import './styles.scss';

interface Props {
	cart: Cart,
	onRemoveCartClick: (cart: Cart) => void,
}

const CartObject = (props: Props) => {
	const { cart, onRemoveCartClick } = props;
	const { title, items } = cart;

	const onRemoveCartClicked = () => onRemoveCartClick(cart);

	const renderItems = (status: string) => items.filter(item => item.status === status).map(item => (
		<div className='cart_object__items__item'>
			<i
				className='material-icons create_cart__cart_item__close_button'
				children={item.status === 'active' ? 'check_box_outline_blank' : 'check_box'}
			/>
			<span className='cart_object__items__item__title'>{item.title}</span>
		</div>
	));

	return (
		<div className='cart_object'>
			<div className='cart_object__remove_button' onClick={onRemoveCartClicked}>
				<i className='material-icons'>cancel</i>
			</div>

			<h4 className='cart_object__title'>{title}</h4>

			<div className='cart_object__items'>
				{renderItems('active')}
				{
					items.filter(item => item.status == 'completed').length !== 0 &&
                    <div className='cart_object__items__separator'/>
				}
				{renderItems('completed')}
			</div>
		</div>
	);
};

export default CartObject;
