import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart, CartItemStatusType } from '../../types/api';

import {
	addDraftCartItem,
	changeDraftCartItemStatus,
	changeDraftCartItemTitle,
	changeDraftCartNotes,
	changeDraftCartTitle, createCart,
	removeDraftCartItem,
} from '../../actions/carts';
import CartItemObject from './CartItemObject';

interface Props {
	dispatch: Function,
	draftCart: Cart
}

const CreateCart = (props: Props) => {
	const { dispatch, draftCart } = props;

	const handleDraftCartTitleChange = (e: any) => dispatch(changeDraftCartTitle(e.target.value));
	const handleDraftCartNotesChange = (e: any) => dispatch(changeDraftCartNotes(e.target.value));

	const onAddDraftCartItemClicked = () => dispatch(addDraftCartItem());
	const handleDraftCartItemTitleChange = (uuid: string, title: string) => dispatch(changeDraftCartItemTitle(uuid, title));
	const handleDraftCartItemStatusChange = (uuid: string, status: CartItemStatusType) => dispatch(changeDraftCartItemStatus(uuid, status));
	const onRemoveDraftCartItemClicked = (uuid: string) => dispatch(removeDraftCartItem(uuid));

	const onCreateCartClicked = (e: any) => {
		dispatch(createCart());
		e.preventDefault();
	};

	const renderDraftCartItems = () => draftCart.items.map(item => (
		<CartItemObject
			key={item.uuid}
			cartItem={item}
			onDraftCartItemTitleChange={handleDraftCartItemTitleChange}
			onDraftCartItemStatusChange={handleDraftCartItemStatusChange}
			onRemoveDraftCartItemClick={onRemoveDraftCartItemClicked}
		/>
	));

	return (
		<form onSubmit={onCreateCartClicked}>
			<input type='text' placeholder='Title' value={draftCart.title} onChange={handleDraftCartTitleChange} />
			<input type='text' placeholder='Notes' value={draftCart.notes} onChange={handleDraftCartNotesChange} />

			{renderDraftCartItems()}

			<input type='button' value='Add Item' onClick={onAddDraftCartItemClicked} />
			<input type="submit" value="Submit" />
		</form>
	);
};

const mapStateToProps = (state: AppState) => {
	const { draftCart } = state.carts;

	return {
		draftCart,
	};
};

export default connect(mapStateToProps)(CreateCart);
