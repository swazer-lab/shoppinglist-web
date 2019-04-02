import { useEffect } from 'react';
import { CartItem } from '../types/api';

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

export const getCartStatus = (items: CartItem[]) => {
	const completedItems = items.filter(item => item.status === 'completed');
	const canceledItems = items.filter(item => item.status === 'canceled');

	if (completedItems.length === items.length) return 'Completed';
	else if (canceledItems.length === items.length) return 'Completed';
	else return 'Active';
};
