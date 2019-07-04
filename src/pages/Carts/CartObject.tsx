import React, { useEffect, useState } from 'react';

import { AppState } from '../../types/store';
import { Cart, CartItemStatusType } from '../../types/api';

import { getCartStatus } from '../../config/utilities';

import avatar from '../../assets/images/avatar.jpeg';
import './styles.scss';

interface Props {
		progress: AppState['service']['progress'],
		cart: Cart,

		currentUserEmail?: string,

		onOpenUpdateCartModalClick: (cart: Cart) => void,
		onRemoveCartClick: (cart: Cart) => void,
		onOpenCopyCartModalClick: (cart: Cart) => void,
		onDraftCartItemStatusChange: (uuid: string, status: CartItemStatusType, cart: Cart) => void,
		onOpenShareModalClick: (e: any) => void,
		onOpenSharedUserInformationClick: (e: any) => void
}

const CartObject = (props: Props) => {
		const [isShareModalVisible, setIsShareModalVisible] = useState(false);
		const [isSharedUserModalVisible, setisSharedUserModalVisible] = useState(false);
		const [accessLevel, setAccessLevel] = useState('');

		const { progress, cart, onOpenUpdateCartModalClick, onRemoveCartClick, onOpenCopyCartModalClick, currentUserEmail, onDraftCartItemStatusChange, onOpenShareModalClick, onOpenSharedUserInformationClick } = props;

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

		const onOpenShareModalClicked = (e: any) => {
				onOpenShareModalClick(e);
		};

		const onOpenSharedUserInformationClicked = (e: any) => {
				onOpenSharedUserInformationClick(e);
		};

		const onOpenCopyCartModalClicked = (e: any) => {
				e.stopPropagation();
				onOpenCopyCartModalClick(cart);
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
				<div className='cart_object' onClick={onOpenUpdateCartModalClicked}>
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

								<div className='cart_object__users_container__user_list'>
										{cart.users.map((user) => (
												<img key={user.uuid} src={user.photoUrl || avatar} width={30} height={30} alt='User Photo'
												     onClick={onOpenSharedUserInformationClicked} />
										))}
								</div>
						</div>

						{/*{accessLevel !== 'read' &&*/}
						{/*<Modal*/}
						{/*isVisible={isShareModalVisible}*/}
						{/*onCloseModalClick={onCloseShareModalClick}*/}
						{/*title={language.textShareCartTitle}*/}
						{/*rightButtons={[{ iconName: 'close', onClick: onCloseShareModalClick }]}>*/}

						{/*<ProgressBar isLoading={progress.visible} />*/}
						{/*<ShareCart cart={cart} />*/}
						{/*</Modal>*/}
						{/*}*/}

						{/*<Modal*/}
						{/*isVisible={isSharedUserModalVisible}*/}
						{/*onCloseModalClick={onCloseSharedUserInformation}*/}
						{/*title='Shared User Information'*/}
						{/*rightButtons={[{ iconName: 'close', onClick: onCloseSharedUserInformation }]}>*/}
						{/*<SharedUserInformation cartUsers={cart.users} />*/}
						{/*</Modal>*/}
				</div>
		);
};

export default CartObject;
