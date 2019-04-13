import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import Hashids from 'hashids';

import { AppState } from '../../types/store';
import { Cart, CartUser, Profile } from '../../types/api';

import { Button } from '../../components';

import { toggleContact } from '../../actions/contacts';
import { shareCartWithContacts } from '../../actions/carts';

import * as urls from '../../config/urls';

import avatar from '../../assets/images/avatar.jpeg';
import language from '../../assets/language';

interface Props {
	dispatch?: Function,

	visibleContacts?: Array<Profile>,
	selectedContacts?: Array<Profile>,

	cart: Cart
}

const ShareCart = (props: Props) => {
	const { dispatch, visibleContacts, selectedContacts, cart } = props;

	const [shareLink, setShareLink] = useState('');

	const handleShareLinkChange = (e?: any) => {
		const accessLevel = e ? e.currentTarget.value : 1;

		const hashids = new Hashids('shoppinglist', 30);
		const shareLink = urls.get_access_to_cart_url_web + '/' + hashids.encode([+cart.id, accessLevel]);

		setShareLink(shareLink);
	};

	const shareLinkRef: React.RefObject<HTMLInputElement> = useRef(null);

	const onCopyLinkButtonClicked = (e: any) => {
		if (shareLinkRef.current)
			shareLinkRef.current!.select();

		document.execCommand('copy');
	};

	useEffect(() => {
		handleShareLinkChange();
	}, []);

	const onShareCartButtonClicked = () => {
		dispatch!(shareCartWithContacts(cart.id));
	};

	const renderContacts = visibleContacts!.map((contact) => {
		const { id, name, email, photoUrl } = contact;
		const isSelected = selectedContacts!.filter((contact) => contact.id === id).length !== 0;

		const onToggleContactClicked = () => {
			dispatch!(toggleContact(contact));
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

	const renderShareWithContactsSection = () => {
		if (visibleContacts!.length === 0) return;

		return (
			<>
				<div className='share_cart__separator' />

				<div className='share_cart__subtitle'>
					{language.textShareCartWithContactSubtitle}
				</div>
				<div className='share_cart__contacts_container'>
					{renderContacts}
				</div>

				<div className='share_cart__sharing_button'>
					<Button
						title={language.actionShareCart}
						onClick={onShareCartButtonClicked}
					/>
				</div>
			</>
		);
	};

	return (
		<div className='share_cart'>
			<div className='share_cart__subtitle'>
				{language.textShareCartWithLinkSubtitle}
			</div>
			<div className='share_cart__create_share_cart_link'>
				<select onChange={handleShareLinkChange}>
					<option value='1' label={language.textAccessLevelWrite} />
					<option value='2' label={language.textAccessLevelRead} />
				</select>
				<input type="button" value="Copy Link" onClick={onCopyLinkButtonClicked} />
				<input
					ref={shareLinkRef}
					type='text'
					value={shareLink}
					placeholder=''
					readOnly={true}
				/>
			</div>
			{renderShareWithContactsSection()}
		</div>
	);
};

const mapStateToProps = (state: AppState, ownProps: Props) => {
	const { contacts, selectedContacts } = state.contacts;
	const { cart } = ownProps;

	const selectedUsersEmails = cart.users.map((user: CartUser) => user.email);

	const visibleContacts = contacts.filter((contact: Profile) => !selectedUsersEmails.includes(contact.email));

	return {
		visibleContacts,
		selectedContacts,
	};
};

export default connect(mapStateToProps)(ShareCart);
