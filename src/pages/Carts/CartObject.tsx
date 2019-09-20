import React, { useEffect, useState } from 'react';

import { AppState } from '../../types/store';
import { Cart, CartItemStatusType } from '../../types/api';

import { getCartStatus } from '../../config/utilities';

import avatar from '../../assets/images/avatar.jpeg';
import './styles.scss';
import index from '../../reducers';

interface Props {
		innerRef?: any,
		provided?: any,
		progress: AppState['service']['progress'],
		cart: Cart,
		cartIndex?: number,

		currentUserEmail?: string,

		onOpenUpdateCartModalClick: (cart: Cart) => void,
		onRemoveCartClick: (cart: Cart) => void,
		onOpenCopyCartModalClick: (cart: Cart) => void,
		onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType, cart: Cart) => void,
		onOpenShareModalClick: (cart: Cart) => void,
		onOpenSharedUserInformationClick: (cart: Cart) => void
		onArchiveCartClick?: (cart: Cart) => void

}

const CartObject = (props: Props) => {
		const [accessLevel, setAccessLevel] = useState('');

		const { progress, cart, cartIndex, onOpenUpdateCartModalClick, onRemoveCartClick, onOpenCopyCartModalClick, currentUserEmail, onDraftCartItemStatusChange, onOpenShareModalClick, onOpenSharedUserInformationClick, innerRef, onArchiveCartClick } = props;

		useEffect(() => {
		}, []);

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

		const onOpenShareModalClicked = (e: any) => {
				e.stopPropagation();
				onOpenShareModalClick(cart);
		};

		const onOpenSharedUserInformationClicked = (e: any) => {
				e.stopPropagation();
				onOpenSharedUserInformationClick(cart);
		};

		const onOpenCopyCartModalClicked = (e: any) => {
				e.stopPropagation();
				onOpenCopyCartModalClick(cart);
		};

		const onArchiveCartClicked = (e: any) => {
				e.stopPropagation();
				onArchiveCartClick!(cart);
		};

		const status = getCartStatus(cart.items);

		const renderItems = (status: string) => cart.items.filter(item => item.status === status).map(item => {
				const handleDraftCartItemStatusChange = (e: any) => {
						e.stopPropagation();
						onDraftCartItemStatusChange(item.uuid, item.status === 'completed' ? 'active' : 'completed', cart);
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
				<div className='cart_object' onClick={onOpenUpdateCartModalClicked} ref={innerRef}>
						<div className='cart_object__remove_button' onClick={onRemoveCartClicked}>
								<i className='material-icons'>cancel</i>
						</div>

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

						<div className='cart_object__users_container'>
								<div className='cart_object__users_container__share_button' onClick={onOpenShareModalClicked}>
										<i className='material-icons'>person_add</i>
								</div>

								<div className='cart_object__users_container__share_button' onClick={onOpenCopyCartModalClicked}>
										<i className='material-icons'>file_copy</i>
								</div>

								<div className='cart_object__users_container__archive_button' onClick={onArchiveCartClicked}>
										<i className='material-icons'>archive</i>
								</div>

								<div className='cart_object__users_container__user_list'>
										{cart.users.map((user) => (
												<img key={user.uuid} src={user.photoUrl || avatar} width={30} height={30} alt='User Photo'
												     onClick={onOpenSharedUserInformationClicked} />
										))}
								</div>
						</div>
				</div>
		);
};

export default CartObject;
