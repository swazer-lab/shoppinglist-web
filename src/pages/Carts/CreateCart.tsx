import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart } from '../../types/api';

import { Button } from '../../components';

import {
	addDraftCartItem,
	changeDraftCartItemStatus,
	changeDraftCartItemTitle,
	changeDraftCartNotes,
	changeDraftCartTitle, createCart,
	removeDraftCartItem,
} from '../../actions/carts';

import './styles.scss';

interface Props {
	dispatch: Function,
	draftCart: Cart
}

const CreateCart = (props: Props) => {
	const [isNotesInputVisible, setIsNotesInputVisible] = useState(false);

	const { dispatch, draftCart } = props;

	const handleDraftCartTitleChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartTitle(e.currentTarget.value));
	const handleDraftCartNotesChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartNotes(e.currentTarget.value));

	const onAddDraftCartItemClicked = () => dispatch(addDraftCartItem());

	const onCreateCartClicked = (e: FormEvent<HTMLFormElement>) => {
		dispatch(createCart());
		e.preventDefault();
	};

	const renderDraftCartItems = () => draftCart.items.map(item => {
		const { uuid, title } = item;

		const handleDraftCartItemTitleChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartItemTitle(uuid, e.currentTarget.value));
		const handleDraftCartItemStatusChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeDraftCartItemStatus(uuid, e.currentTarget.checked ? 'completed' : 'active'));

		const onRemoveDraftCartItemClicked = () => dispatch(removeDraftCartItem(uuid));

		return (
			<div key={item.uuid} className='create_cart__cart_item'>
				<input
					type='checkbox'
					onChange={handleDraftCartItemStatusChange}
				/>
				<input
					className='create_cart__cart_item__title_input'
					value={title}
					onChange={handleDraftCartItemTitleChange}
					type='text'
					placeholder='Item Name'
					required
				/>

				<input
					type='button'
					value='X'
					onClick={onRemoveDraftCartItemClicked}
				/>
			</div>
		);
	});

	return (
		<div className='create_cart'>
			<form className='create_cart__form' onSubmit={onCreateCartClicked}>
				<input
					className='create_cart__form__title_input'
					type='text'
					placeholder='Cart Name'
					value={draftCart.title}
					onChange={handleDraftCartTitleChange}
					required
				/>

				{isNotesInputVisible &&
				<input
					type='text'
					placeholder='Notes'
					value={draftCart.notes}
					onChange={handleDraftCartNotesChange}
				/>
				}

				<div className='create_cart__form__cart_items'>
					{renderDraftCartItems()}
				</div>

				<input
					className='create_cart__form__add_item_button'
					type='button'
					value='Add Item'
					onClick={onAddDraftCartItemClicked}
				/>

				<Button
					className='create_cart__form__submit_button'
					type='submit'
					title='Submit'
				/>
			</form>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { draftCart } = state.carts;

	return {
		draftCart,
	};
};

export default connect(mapStateToProps)(CreateCart);
