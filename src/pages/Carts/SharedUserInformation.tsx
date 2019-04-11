import React from 'react';
import { CartUser } from '../../types/api';
import avatar from '../../assets/images/avatar.jpeg';

interface Props {
	cartUsers: CartUser[]
}

const SharedUserInformation = (props: Props) => {
	const { cartUsers } = props;

	const renderUsers = cartUsers!.map((user) => {
		const { email, accessLevel, name, photoUrl } = user;

		return (
			<div key={user.id} className='shared_user'>
				<div className='shared_user__photo_container'>
					<div className='shared_user__photo_container__photo'
					     style={{ backgroundImage: `url(${photoUrl || avatar})` }}>
					</div>
					<div className='shared_user__photo_container__info_container'>
						<div>{name}</div>
						<div>{email}</div>
					</div>
				</div>
				<div className='shared_user__accessLevel'>{accessLevel}</div>
			</div>
		);
	});

	return (
		<div>
			<div className='shared_user_container'>
				{renderUsers}
			</div>
		</div>
	);
};

export default SharedUserInformation;
