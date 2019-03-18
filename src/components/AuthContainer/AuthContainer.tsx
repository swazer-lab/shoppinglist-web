import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AppState } from '../../types/store';

import { Button, ProgressBar } from '../';

import language from '../../assets/language';
import './styles.scss';
import { navigate } from '../../actions/service';

interface Props {
	dispatch: Function,
	children?: any,

	className: string,
	isLoading?: boolean,
}

const AuthContainer = (props: Props) => {
	const { dispatch, children, className, isLoading } = props;

	const onPrivacyClicked = () => dispatch(navigate('privacyPolicy'));
	const onTermsClicked = () => dispatch(navigate('serviceTerms'));

	return (
		<div className={classNames('auth_container', className)}>
			<div className='auth_container__box'>
				<div className='auth_container__content_container'>
					<ProgressBar isLoading={isLoading || false}/>
					{children}
				</div>
				<div className='auth_container__links'>
					<Button mode='text' accentColor='text' title={language.textPrivacy} onClick={onPrivacyClicked}/>
					<Button mode='text' accentColor='text' title={language.textTerms} onClick={onTermsClicked}/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(AuthContainer);
