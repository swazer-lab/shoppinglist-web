import { useEffect, useState } from 'react';

export const useLocalStorage = (): { accessToken: string, isLoggedIn: boolean, activeLanguage: string, isEmailConfirmed: boolean } => {
	const accessToken = localStorage.getItem('accessToken') || '';
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
	const activeLanguage = localStorage.getItem('activeLanguage') || '';

	const isEmailConfirmed = localStorage.getItem('isEmailConfirmed') === 'true' || false;

	return { accessToken, isLoggedIn, activeLanguage, isEmailConfirmed };
};

export const useDocumentTitle = (pageName: string) => {
	useEffect(() => {
		document.title = 'Shopping List | ' + pageName;
	}, []);
};

export const useLoStorage = (): { isLoggedIn: boolean, accessToken: string, isEmailConfirmed: boolean, activeLanguage: 'en' | 'tr' | 'ar' } => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState('');
	const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
	const [activeLanguage, setActiveLanguage] = useState<'en' | 'tr' | 'ar'>('en');

	useEffect(() => {
		console.log('stated');

		const handleLocalStorageUpdate = (e: any) => {
			console.log('________________________', e);

			setIsLoggedIn(Boolean(localStorage.getItem('isLoggedIn') || false));
			setAccessToken(localStorage.getItem('accessToken') || '');
			setIsEmailConfirmed(Boolean(localStorage.getItem('isEmailConfirmed')) || false);
			// @ts-ignore
			setActiveLanguage(localStorage.getItem('activeLanguage') || 'en');
		};

		window.addEventListener('storage', handleLocalStorageUpdate, false);
		return () => {
			window.removeEventListener('storage', handleLocalStorageUpdate);
		};
	});

	return { isLoggedIn, accessToken, isEmailConfirmed, activeLanguage };
};