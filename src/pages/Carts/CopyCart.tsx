import React, { FormEvent } from 'react';

import language from '../../assets/language';
import Button from '../../components/Button/Button';
import { Cart, CartItem } from '../../types/api';
import Modal from '../../components/Modal/Modal';

interface Props {

	draftCart: Cart,

	onCloseCopyCartModalClick: () => void
	onDraftCartTitleChange: (title: string) => void,
	onCopyCartClick: () => void,
	isVisible: boolean,

	cartItem: CartItem
}


const CopyCart = (props: Props) => {

	const { draftCart, onCloseCopyCartModalClick, onDraftCartTitleChange, isVisible, onCopyCartClick, cartItem } = props;
	const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => onDraftCartTitleChange(e.currentTarget.value);
	const onCloseCopyCartModalClicked = () => {
		onCloseCopyCartModalClick();
	};

	const onCopyCartClicked = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onCopyCartClick();
	};

	return (
		<Modal isVisible={isVisible} onCloseModalClick={onCloseCopyCartModalClicked} title='Copy Cart'>
			<form onSubmit={onCopyCartClicked}
			      onClick={(e: any) => e.stopPropagation()}>
				<div className='share_cart'>
					<div className='share_cart__subtitle'>
						{language.textEnterName}
					</div>
					<div className='share_cart__create_share_cart_link'>
						<input
							className='input-component'
							type='input'
							value={draftCart.title}
							onChange={handleDraftCartTitleChange}
							required
						/>
					</div>

					<Button
						className='update_cart__form__buttons_container__submit_button'
						type='submit'
						title={language.actionCopyCart}
					/>
				</div>
			</form>
		</Modal>
	);
};
export default CopyCart;
