import * as React from 'react';
import { Cart } from '../../types/api';

import './styles.scss';

interface Props {
	cart: Cart
}

const CartObject = (props: Props) => {
	const { title, notes, items } = props.cart;
	return (
		<div className='cart_object'>
			<h4>{title}</h4>
			<h6>{notes}</h6>

			<ul>
				{items.map(item => <li key={item.uuid}>{item.title}</li>)}
			</ul>
		</div>
	);
};

export default CartObject;
