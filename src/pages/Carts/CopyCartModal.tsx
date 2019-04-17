import React, {
	FormEvent, useState,
} from 'react';

import { Cart } from '../../types/api';
import { Button, Modal } from '../../components';

import language from '../../assets/language';

interface Props {
	isVisible: boolean,
	draftCart: Cart,
	onDraftCartTitleChange: (title: string) => void,
	onCopyCartClick: (hasToShare: boolean) => void,
	onCloseCopyCartModalClick: () => void,
}

const CopyCartModal = (props: Props) => {
	const [hasToShare, setHasToShare] = useState(false);

	const { isVisible, draftCart, onDraftCartTitleChange, onCopyCartClick, onCloseCopyCartModalClick } = props;
	const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => onDraftCartTitleChange(e.currentTarget.value);
	const onCopyCartClicked = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onCopyCartClick(hasToShare);
	};

	return (
		<Modal isVisible={isVisible} onCloseModalClick={onCloseCopyCartModalClick} title={language.titleCopyCart}
		       rightButtons={[{ iconName: 'close', onClick: onCloseCopyCartModalClick }]}>

			<form onSubmit={onCopyCartClicked} onClick={(e: any) => e.stopPropagation()}>
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
						<i className='material-icons cart_item_object__close_button'
						   onClick={() => setHasToShare((prevState => !prevState))}
						   children={hasToShare ? 'check_box' : 'check_box_outline_blank'}
						/>
						Share with friend
					</div>
					<Button
						className='update_cart__form__buttons_container__submit_button'
						type='submit'
						title={language.titleCopyCart}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default CopyCartModal;
