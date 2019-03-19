import React, { FormEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AppState } from '../../types/store';

import { Button, Input } from '../../components';

import { navigate } from '../../actions/service';
import { changeEmail, changePassword, login } from '../../actions/auth';

import language from '../../assets/language';
import './styles.scss';

interface Props {
	dispatch: Function,

	email: string,
	password: string,
}

const Landing = (props: Props) => {
	const { dispatch, email, password } = props;

	const [isScrolled, setIsScrolled] = useState(false);
	const [isKeepSignedInActive, setIsKeepSignedInActive] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY !== 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleEmailChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeEmail(e.currentTarget.value));
	const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => dispatch(changePassword(e.currentTarget.value));

	const onLoginClicked = (e: any) => {
		dispatch(login());
		e.preventDefault();
	};
	const onKeepSignedInClicked = () => setIsKeepSignedInActive((prevState) => !prevState);

	const onAppStoreBadgeClicked = () => window.open('https://play.google.com/store/apps/details?id=com.classdojo.android', '_blank');
	const onGooglePlayBadgeClicked = () => window.open('https://play.google.com/store/apps/details?id=tanmiagrp.com.shopping', '_blank');

	const navigateLogin = () => dispatch(navigate('Login'));
	const navigateRegister = () => dispatch(navigate('Register'));
	const navigateForgotPassword = () => dispatch(navigate('ForgotPassword'));
	const navigatePrivacyPolicy = () => dispatch(navigate('PrivacyPolicy'));
	const navigateServiceTerms = () => dispatch(navigate('ServiceTerms'));

	return (
		<div className='landing_page'>
			<nav className={classNames('landing_page__nav', { landing_page__nav__scrolled: isScrolled })}>
				<div className='landing_page__row landing_page__nav__content_container'>
					<img
						src={require('../../assets/images/logo.png')}
						alt='logo'
					/>
					<div>
						<Button
							mode='text'
							title='Login'
							onClick={navigateLogin}
						/>
						<Button
							title='Register'
							onClick={navigateRegister}
						/>
					</div>
				</div>
			</nav>

			<header className='landing_page__header landing_page__row'>
				<div className='landing_page__column landing_page__header__auth_container'>
					<h1>Shopping List App.</h1>
					<h2>
						A simple way to text, video chat and plan things all in one place.
					</h2>
					<form onSubmit={onLoginClicked}>
						<Input
							value={email}
							onChange={handleEmailChange}
							type='email'
							placeholder={language.textEnterEmail}
							required
						/>
						<Input
							value={password}
							onChange={handlePasswordChange}
							type='password'
							placeholder={language.textEnterPassword}
							required
							pattern='.{6,}'
						/>

						<Button title='Login' onClick={onLoginClicked} />
					</form>

					<div className='landing_page__header__keep_signed_in'>
						<i className='material-icons'
						   children={isKeepSignedInActive ? 'check_box' : 'check_box_outline_blank'}
						   onClick={onKeepSignedInClicked}
						/>
						<label onClick={onKeepSignedInClicked}>Keep me signed in</label>
					</div>

					<span onClick={navigateForgotPassword} className='landing_page__header__forgot_password'>Did you forgot your Password?</span>

					<div className='landing_page__header__store_buttons'>
						<img
							src='https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/BTZJR_yyOiL.png'
							alt='Apple Store'
							onClick={onAppStoreBadgeClicked}
						/>
						<img
							src='https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/5peqYnG03DY.png'
							alt='Google Play'
							onClick={onGooglePlayBadgeClicked}
						/>
					</div>
				</div>
				<div className='landing_page__column landing_page__header__phone_container'>
					<img
						className='landing_page__header__phone'
						src={require('../../assets/images/iphone.png')}
						alt='iPhone'
					/>
					<img
						className='landing_page__header__phone'
						src={require('../../assets/images/android.png')}
						alt='Android'
					/>
				</div>
			</header>
			<section className='landing_page__features_section'>
				<div className='landing_page__features_section__content_container landing_page__row'>
					<div className='landing_page__column landing_page__features_section__feature'>
						<img
							src={require('../../assets/images/feature_1.svg')}
							alt='feature_1'
						/>
						<div>
							<h1>Lorem ipsum dolor sit amet.</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aut</p>
						</div>
					</div>
					<div className='landing_page__column landing_page__features_section__feature'>
						<img
							src={require('../../assets/images/feature_2.svg')}
							alt='feature_2'
						/>
						<div>
							<h1>Lorem ipsum dolor sit amet.</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aut</p>
						</div>
					</div>
					<div className='landing_page__column landing_page__features_section__feature'>
						<img
							src={require('../../assets/images/feature_3.svg')}
							alt='feature_3'
						/>
						<div>
							<h1>Lorem ipsum dolor sit amet.</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aut</p>
						</div>
					</div>
					<div className='landing_page__column landing_page__features_section__feature'>
						<img
							src={require('../../assets/images/feature_4.svg')}
							alt='feature_4'
						/>
						<div>
							<h1>Lorem ipsum dolor sit amet.</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium aut</p>
						</div>
					</div>
				</div>
			</section>
			<footer className='landing_page__footer'>
				<footer className='landing_page__row landing_page__footer__content_container'>
					<p>
						Copyright ©{new Date().getFullYear()}. All Rights Reserved By {' '}
						<a href='https://swazerlab.com/' target='_blank'>SWAZER</a>
					</p>
					<div>
						<Button
							mode='text'
							title={language.titlePrivacyPolicy}
							onClick={navigatePrivacyPolicy}
						/>
						<Button
							mode='text'
							title={language.titleServiceTerms}
							onClick={navigateServiceTerms}
						/>
					</div>
				</footer>
			</footer>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, password } = state.auth;
	return {
		email,
		password,
	};
};

export default connect(mapStateToProps)(Landing);
