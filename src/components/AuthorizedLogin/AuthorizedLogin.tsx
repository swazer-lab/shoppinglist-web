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
		<>
			<Button
				className='continue_as_user'
				title={`Continue as ${userName}`}
				onClick={onLoginClick}


			/>
			<Button
				className='switch_user'
				mode='text'
				accentColor='text'
				title='Switch Account'
				onClick={onSwitchAccountClick}
			/>
		</>
	);
};

export default AuthorizedLogin;
