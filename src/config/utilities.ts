import { useEffect } from 'react';

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
	}, [pageName]);
};
