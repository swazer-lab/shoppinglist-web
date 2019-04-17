import React, { useEffect, useState } from 'react';

import { AppState } from '../../types/store';
import { Cart, CartItemStatusType } from '../../types/api';

import { Modal, ProgressBar } from '../../components';
import ShareCart from './ShareCart';

import { getCartStatus } from '../../config/utilities';
import language from '../../assets/language';

import avatar from '../../assets/images/avatar.jpeg';
import './styles.scss';
import SharedUserInformation from './SharedUserInformation';

interface Props {
	progress: AppState['service']['progress'],
	cart: Cart,

	currentUserEmail?: string,

	onOpenUpdateCartModalClick: (cart: Cart) => void,
	onRemoveCartClick: (cart: Cart) => void,
	onOpenCopyCartModalClick: (cart: Cart) => void,
	onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType, cart: Cart) => void,
}

const CartObject = (props: Props) => {
	const [isShareModalVisible, setIsShareModalVisible] = useState(false);
	const [isSharedUserModalVisible, setisSharedUserModalVisible] = useState(false);
	const [accessLevel, setAccessLevel] = useState('');

	const { progress, cart, onOpenUpdateCartModalClick, onRemoveCartClick, onOpenCopyCartModalClick, currentUserEmail, onDraftCartItemStatusChange } = props;

	useEffect(() => {
		if (!progress.visible && isShareModalVisible) {
			setIsShareModalVisible(false);
		}
	}, [progress.visible]);

	useEffect(() => {
		if (!currentUserEmail) return;

		const currentUser = cart.users.filter(user => user.email === currentUserEmail)[0];

		if (currentUser) {
			setAccessLevel(currentUser.accessLevel);
		}
	}, [currentUserEmail]);

	const onOpenUpdateCartModalClicked = () => {
		if (accessLevel !== 'read') onOpenUpdateCartModalClick(cart);
	};

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

	const onOpenSharedUserInformation = (e: any) => {
		e.stopPropagation();
		setisSharedUserModalVisible(true);
	};

	const onCloseSharedUserInformation = (e: any) => {
		e.stopPropagation();
		setisSharedUserModalVisible(false);
	};

	const onOpenCopyCartModalClicked = (e: any) => {
		e.stopPropagation();
		onOpenCopyCartModalClick(cart);
	};

	const status = getCartStatus(cart.items);


	const renderItems = (status: string) => cart.items.filter(item => item.status === status).map(item => {

		const handleDraftCartItemStatusChange = () => onDraftCartItemStatusChange(item.uuid, item.status === 'completed' ? 'active' : 'completed', cart);

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
		<div className='cart_object'>
			{accessLevel === 'owner' &&
			<div className='cart_object__remove_button' onClick={onRemoveCartClicked}>
				<i className='material-icons'>cancel</i>
			</div>
			}

			<h4 className='cart_object__title' onClick={onOpenUpdateCartModalClicked}>{cart.title}</h4>
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

			<div className='cart_object__users_container'>
				<div className='cart_object__users_container__share_button' onClick={onOpenShareModalClick}>
					<i className='material-icons'>person_add</i>
				</div>

				<div className='cart_object__users_container__share_button' onClick={onOpenCopyCartModalClicked}>
					<i className='material-icons'>file_copy</i>
				</div>

				<div className='cart_object__users_container__user_list'>
					{cart.users.map((user) => (
						<img key={user.uuid} src={user.photoUrl || avatar} width={30} height={30} alt='User Photo'
						     onClick={onOpenSharedUserInformation} />
					))}
				</div>
			</div>

			{accessLevel !== 'read' &&
			<Modal
				isVisible={isShareModalVisible}
				onCloseModalClick={onCloseShareModalClick}
				title={language.textShareCartTitle}
				buttons={[{ iconName: 'close', onClick: onCloseShareModalClick }]}>

				<ProgressBar isLoading={progress.visible} />
				<ShareCart cart={cart} />
			</Modal>
			}

			<Modal
				isVisible={isSharedUserModalVisible}
				onCloseModalClick={onCloseSharedUserInformation}
				title='Shared User Information'
				buttons={[{ iconName: 'close', onClick: onCloseSharedUserInformation }]}>
				<SharedUserInformation cartUsers={cart.users} />
			</Modal>
		</div>
	);
};

export default CartObject;
