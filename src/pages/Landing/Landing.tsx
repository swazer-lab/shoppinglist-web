import React, { FormEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { AppState } from '../../types/store';

import { AuthorizedLogin, Button, Input } from '../../components';

import { clearAlert, navigate } from '../../actions/service';
import { changeEmail, changePassword, login, logout } from '../../actions/auth';

import language from '../../assets/language';
import './styles.scss';

interface Props {
		dispatch: Function,
		email: string,
		userName: string,
		password: string,
		isLoggedIn: boolean,

		alert: AppState['service']['alert'],
}

const Landing = (props: Props) => {

		const { dispatch, email, password, userName, isLoggedIn, alert } = props;

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

		const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
				dispatch(changeEmail(e.currentTarget.value));
				dispatch(clearAlert());
		};

		const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
				dispatch(changePassword(e.currentTarget.value));
				dispatch(clearAlert());
		};

		const onLoginClicked = (e: any) => {
				if (isLoggedIn && userName) {
						dispatch(navigate('Carts'));
						return;
				}

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

		const onSwitchAccountClicked = () => dispatch(logout());

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
														title={language.actionLogin}
														onClick={navigateLogin}
												/>
												<Button
														title={language.actionLandingRegister}
														onClick={navigateRegister}
												/>
										</div>
								</div>
						</nav>

						<header className='landing_page__header landing_page__row'>
								<div className='landing_page__column landing_page__header__auth_container'>
										<h1>{language.textTitleLanding}</h1>
										<h2>
												{language.textSubtitleLanding}
										</h2>
										<div className='landing_page__column landing_page__header__auth_container__error_message'>
												{alert.message}
										</div>
										{isLoggedIn && userName ?
												<AuthorizedLogin onLoginClick={onLoginClicked} onSwitchAccountClick={onSwitchAccountClicked}
												                 userName={userName} /> :
												<>
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
																<Button type='submit' title={language.actionLogin} />
														</form>

														<div className='landing_page__header__keep_signed_in'>
																<i className='material-icons'
																   children={isKeepSignedInActive ? 'check_box' : 'check_box_outline_blank'}
																   onClick={onKeepSignedInClicked}
																/>
																<label onClick={onKeepSignedInClicked}>{language.actionKeepSignedMe}</label>
														</div>

														<span onClick={navigateForgotPassword}
														      className='landing_page__header__forgot_password'>{language.actionLandingForgotPassword}</span>
												</>
										}
										<div className='landing_page__header__store_buttons'>
												<img
														src={require('../../assets/images/app_store_badge.svg')}
														alt='Apple Store'
														onClick={onAppStoreBadgeClicked}
												/>
												<img
														src={require('../../assets/images/google_play_badge.svg')}
														alt='Google Play'
														onClick={onGooglePlayBadgeClicked}
												/>
										</div>
								</div>
								<div className='landing_page__column landing_page__header__phone_container'>
										<img
												className='landing_page__header__phone'
												src={require('../../assets/images/iphoneLanding.png')}
												alt='iPhone'
										/>
										<img
												className='landing_page__header__phone'
												src={require('../../assets/images/androidLanding.png')}
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
														<h1>{language.textTitlePhotoCart1}</h1>
														<p>{language.textSubtitlePhotoCart1}</p>
												</div>
										</div>
										<div className='landing_page__column landing_page__features_section__feature'>
												<img
														src={require('../../assets/images/feature_2.svg')}
														alt='feature_2'
												/>
												<div>
														<h1>{language.textTitlePhotoCart2}</h1>
														<p>{language.textSubtitlePhotoCart2}</p>
												</div>
										</div>
										<div className='landing_page__column landing_page__features_section__feature'>
												<img
														src={require('../../assets/images/feature_3.svg')}
														alt='feature_3'
												/>
												<div>
														<h1>{language.textTitlePhotoCart3}</h1>
														<p>{language.textSubtitlePhotoCart3}</p>
												</div>
										</div>
										<div className='landing_page__column landing_page__features_section__feature'>
												<img
														src={require('../../assets/images/feature_4.svg')}
														alt='feature_4'
												/>
												<div>
														<h1>{language.textTitlePhotoCart4}</h1>
														<p>{language.textSubtitlePhotoCart4}</p>
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

Landing.layoutOptions = {
		title: '',
		layout: '',
};

const mapStateToProps = (state: AppState) => {
		const { email, password } = state.auth;
		const { alert } = state.service;
		const { isLoggedIn, userName } = state.storage;

		return {
				email,
				password,
				alert,
				isLoggedIn,
				userName,
		};
};

export default connect(mapStateToProps)(Landing);
