import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AppState } from '../../types/store';
import { Profile } from '../../types/api';

import { Button } from '../../components';

import { toggleContact } from '../../actions/contacts';
import { shareCartWithContacts } from '../../actions/carts';

import avatar from '../../assets/images/avatar.jpeg';

interface Props {
	dispatch: Function,

	contacts: Array<Profile>,
	selectedContacts: Array<Profile>,

	cartId: string
}

const ShareCart = (props: Props) => {
	const { dispatch, contacts, selectedContacts, cartId } = props;

	const onShareCartButtonClicked = () => {
		dispatch(shareCartWithContacts(cartId));
	};

	const renderContacts = contacts.map((contact) => {
		const { id, name, email, photoUrl } = contact;
		const isSelected = selectedContacts.filter((contact) => contact.id === id).length !== 0;

		const onToggleContactClicked = () => {
			dispatch(toggleContact(contact));
		};

		return (
			<div key={contact.id} className='share_cart__contact' onClick={onToggleContactClicked}>
				<div className='share_cart__contact__img'
				     style={{ backgroundImage: `url(${photoUrl || avatar})` }}>
					<div
						className={classNames('share_cart__contact__img__label', { share_cart__contact__img__label_selected: isSelected })}>
						<i className='material-icons'>done</i>
					</div>
				</div>
				<div className='share_cart__contact__name'>{name}</div>
				<div className='share_cart__contact__email'>{email}</div>
			</div>
		);
	});

	return (
		<div className='share_cart'>
			<div className='share_cart__contacts_container'>
				{renderContacts}
			</div>

			<Button
				title='Share'
				onClick={onShareCartButtonClicked}
			/>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { contacts, selectedContacts } = state.contacts;
	return {
		contacts,
		selectedContacts,
	};
};

export default connect(mapStateToProps)(ShareCart);
