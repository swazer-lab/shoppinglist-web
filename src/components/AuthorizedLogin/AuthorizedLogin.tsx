import * as React from 'react';
import './styles.scss';
import { Button } from '../Button';

interface Props {
		onLoginClick?: (e?: any) => void,
		onSwitchAccountClick?: () => void,
		userName: string
}

const AuthorizedLogin = (props: Props) => {
		const { onLoginClick, onSwitchAccountClick, userName } = props;

		return (
				<div className='authorized_login_container'>
						<Button
								className='authorized_login_container__continue_as_user'
								title={`Continue as ${userName}`}
								onClick={onLoginClick}
						/>

						<Button
								className='authorized_login_container__switch_user'
								mode='text'
								accentColor='text'
								title='Switch Account'
								onClick={onSwitchAccountClick}
						/>
				</div>
		);
};

export default AuthorizedLogin;
