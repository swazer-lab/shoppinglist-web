import React, { useState } from 'react';
import { Cart } from '../../types/api';

import { Modal, Button } from '../../components';
import ShareCart from './ShareCart';

import './styles.scss';

interface Props {
	cart: Cart,

	onOpenUpdateCartModalClick: (cart: Cart) => void,
	onRemoveCartClick: (cart: Cart) => void
}

const CartObject = (props: Props) => {
	const [isShareModalVisible, setIsShareModalVisible] = useState(false);
	const { cart, onOpenUpdateCartModalClick, onRemoveCartClick } = props;

	const onOpenUpdateCartModalClicked = () => onOpenUpdateCartModalClick(cart);
	const onRemoveCartClicked = (e: any) => {
		e.stopPropagation();
		onRemoveCartClick(cart);
	};

	const openShareModalClick = (e: any) => {
		e.stopPropagation();
		setIsShareModalVisible(true);
	};

	const renderItems = (status: string) => cart.items.filter(item => item.status === status).map(item => (
		<div key={item.uuid} className='cart_object__items__item'>
			<i
				className='material-icons create_cart__cart_item__close_button'
				children={item.status === 'active' ? 'check_box_outline_blank' : 'check_box'}
			/>
			<span className='cart_object__items__item__title'>{item.title}</span>
		</div>
	));

	return (
		<div className='cart_object' onClick={onOpenUpdateCartModalClicked}>
			<div className='cart_object__remove_button' onClick={onRemoveCartClicked}>
				<i className='material-icons'>cancel</i>
			</div>

			<h4 className='cart_object__title'>{cart.title}</h4>

			<div className='cart_object__items'>
				{renderItems('active')}
				{
					cart.items.filter(item => item.status == 'completed').length !== 0 &&
                    <div className='cart_object__items__separator'/>
				}
				{renderItems('completed')}
			</div>

			<div className='cart_object__users_container'>

				<div className='cart_object__users_container__share_button' onClick={openShareModalClick}>
					<i className='material-icons'>person_add</i>
				</div>

				<div className='cart_object__users_container__user_list'>
					{cart.users.map((user) => (
						<img src={user.photoUrl} width={30} height={30} alt='User Photo'/>
					))}
				</div>
			</div>

			<Modal
				isVisible={isShareModalVisible}
				onCloseModalClick={() => setIsShareModalVisible(false)}
				title='Share'
				buttons={[{ iconName: 'close', onClick: () => setIsShareModalVisible(false) }]}
			>
				<ShareCart cartId={cart.id}/>
			</Modal>
		</div>
	);
};

export default CartObject;
