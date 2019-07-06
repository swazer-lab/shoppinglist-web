import React from 'react';

import { Cart, CartItemStatusType } from '../../types/api';
import '../Carts/styles.scss';
import { getCartStatus } from '../../config/utilities';


interface Props {
		cart: Cart,
		onDraftCartItemStatusChange?: (uuid: string, status: CartItemStatusType, cart: Cart) => void,
}

const ArchievedCardsObject = (props: Props) => {

		const {  cart, onDraftCartItemStatusChange } = props;

		const status = getCartStatus(cart.items);

		const renderItems = (status: string) => cart.items.filter(item => item.status === status).map(item => {

				const handleDraftCartItemStatusChange = (e: any) => {
						e.stopPropagation();
						if (onDraftCartItemStatusChange) onDraftCartItemStatusChange!(item.uuid, item.status === 'completed' ? 'active' : 'completed', cart);
				};

				return (
						<div key={item.uuid} className='cart_object__items__item'>
								<i
										onClick={handleDraftCartItemStatusChange}
										className='material-icons create_cart__cart_item__close_button'
										children={item.status === 'active' ? 'check_box_outline_blank' : 'check_box'}
								/>
								<span className='cart_object__items__item__title'>{item.title}</span>
						</div>
				);
		});


		return (
				<div className='cart_object' style={{marginBottom:10}}>
						<h4 className='cart_object__title'>{cart.title}</h4>
						{
								status === 'Active' ?
										<div className='cart_object__status_active'>
												{status}
												<div className='cart_object__status_active__dot_active'></div>
										</div>
										:
										<div className='cart_object__status_completed'>
												{status}
												<div className='cart_object__status_completed__dot_completed'></div>
										</div>
						}
						<div className='cart_object__items'>
								{renderItems('active')}
								{
										cart.items.filter(item => item.status == 'completed').length !== 0 &&
										<div className='cart_object__items__separator' />
								}
								{renderItems('completed')}
						</div>

				</div>

		);
};

export default ArchievedCardsObject;



