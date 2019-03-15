import React, { useState, useEffect } from 'react';

import { AppState } from '../../types/store';
import { Cart } from '../../types/api';

import { Modal, ProgressBar } from '../../components';
import ShareCart from './ShareCart';

import avatar from '../../assets/images/avatar.jpeg';
import './styles.scss';

interface Props {
	progress: AppState['service']['progress'],
	cart: Cart,

	onOpenUpdateCartModalClick: (cart: Cart) => void,
	onRemoveCartClick: (cart: Cart) => void
}

const CartObject = (props: Props) => {
	const [isShareModalVisible, setIsShareModalVisible] = useState(false);
	const { progress, cart, onOpenUpdateCartModalClick, onRemoveCartClick } = props;

	useEffect(() => {
		if (!progress.visible && isShareModalVisible) {
			setIsShareModalVisible(false);
		}
	}, [progress.visible]);

	const onOpenUpdateCartModalClicked = () => onOpenUpdateCartModalClick(cart);
	const onRemoveCartClicked = (e: any) => {
		e.stopPropagation();
		onRemoveCartClick(cart);
	};

	const onOpenShareModalClick = (e: any) => {
		e.stopPropagation();
		setIsShareModalVisible(true);
	};

	const onCloseShareModalClick = (e: any) => {
		e.stopPropagation();
		setIsShareModalVisible(false);
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
				<div className='cart_object__users_container__share_button' onClick={onOpenShareModalClick}>
					<i className='material-icons'>person_add</i>
				</div>

				<div className='cart_object__users_container__user_list'>
					{cart.users.map((user) => (
						<img key={user.uuid} src={user.photoUrl || avatar} width={30} height={30} alt='User Photo'/>
					))}
				</div>
			</div>

			<Modal
				isVisible={isShareModalVisible}
				onCloseModalClick={onCloseShareModalClick}
				title='Share'
				buttons={[{ iconName: 'close', onClick: onCloseShareModalClick }]}>

				<ProgressBar isLoading={progress.visible}/>
				<ShareCart cart={cart}/>
			</Modal>
		</div>
	);
};

export default CartObject;
