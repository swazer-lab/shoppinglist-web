import React, { FormEvent } from 'react';

import { Cart } from '../../types/api';
import { Button, Modal } from '../../components';

import language from '../../assets/language';

interface Props {
  isVisible: boolean,
  draftCart: Cart,

  onDraftCartTitleChange: (title: string) => void,
  onCopyCartClick: () => void,
  onCloseCopyCartModalClick: () => void
}

const CopyCartModal = (props: Props) => {
  const { isVisible, draftCart, onDraftCartTitleChange, onCopyCartClick, onCloseCopyCartModalClick } = props;

  const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => onDraftCartTitleChange(e.currentTarget.value);
  const onCopyCartClicked = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCopyCartClick();
  };

  return (
    <Modal isVisible={isVisible} onCloseModalClick={onCloseCopyCartModalClick} title={language.titleCopyCart}>
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
