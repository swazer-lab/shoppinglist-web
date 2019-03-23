import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import './styles.scss';
import { Button } from '../../components/Button';
import language from '../../assets/language';
import { navigate } from '../../actions/service';

interface Props {
	children?: any,
	dispatch: Function,
}

const AuthLayout = (props: Props) => {
	const { children, dispatch } = props;

	const navigatePrivacyPolicy = () => dispatch(navigate('PrivacyPolicy'));
	const navigateServiceTerms = () => dispatch(navigate('ServiceTerms'));

	return (
		<div className='auth_layout'>
			<div className='auth_layout__container'>
				<div className='auth_layout__container__content'>
					{children}
				</div>
				<div className='auth_layout__container__links'>
					<Button
						mode='text'
						accentColor='text'
						title={language.textPrivacy}
						onClick={navigatePrivacyPolicy}
					/>
					<Button
						mode='text'
						accentColor='text'
						title={language.textTerms}
						onClick={navigateServiceTerms}
					/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(AuthLayout);
