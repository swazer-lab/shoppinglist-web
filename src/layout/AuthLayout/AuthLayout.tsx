import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AppState } from '../../types/store';

import { Button } from '../../components/Button';

import { navigate } from '../../actions/service';
import language from '../../assets/language';

import './styles.scss';

interface Props {
	children?: any,
	dispatch: Function,

	progress: AppState['service']['progress'],
	alert: AppState['service']['alert'],
}

const AuthLayout = (props: Props) => {
	const { children, dispatch, progress, alert } = props;

	const navigatePrivacyPolicy = () => dispatch(navigate('PrivacyPolicy'));
	const navigateServiceTerms = () => dispatch(navigate('ServiceTerms'));

	return (
		<div className='auth_layout'>
			<div className='auth_layout__container'>
				<div className='auth_layout__container__content'>
					<div className='auth_layout__progress'>
						<div
							className={classNames('auth_layout__progress__label', { auth_layout__progress__label_visible: progress.visible })}
						/>
					</div>
					<div className={classNames('auth_layout__alert', { auth_layout__alert_visible: alert.visible })}>
						{alert.message}
					</div>

					<div className='auth_layout__container__content__children'>
						{children}
					</div>
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
	const { progress, alert } = state.service;

	return {
		progress,
		alert,
	};
};

export default connect(mapStateToProps)(AuthLayout);
