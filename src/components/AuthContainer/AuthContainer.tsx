import * as React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AppState } from '../../types/store';

import { Button } from '../';
import './styles.scss';

interface Props {
	dispatch: Function,
	children?: any,

	className: string,
	contentContainerClassName?: string,
}

const AuthContainer = (props: Props) => {
	const { dispatch, children, className, contentContainerClassName } = props;

	const onHelpClicked = () => dispatch('');
	const onPrivacyClicked = () => dispatch('');
	const onTermsClicked = () => dispatch('');

	return (
		<div className={classNames('auth_container', className)}>
			<div className='auth_container__box'>
				<div className={classNames('auth_container__content_container', contentContainerClassName)}>
					{children}
				</div>
				<div className='auth_container__links'>
					<Button mode='text' accentColor='text' title='Help' onClick={onHelpClicked} />
					<Button mode='text' accentColor='text' title='Privacy' onClick={onPrivacyClicked} />
					<Button mode='text' accentColor='text' title='Terms' onClick={onTermsClicked} />
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(AuthContainer);
