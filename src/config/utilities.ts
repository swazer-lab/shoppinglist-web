import { useEffect } from 'react';
import { CartItem } from '../types/api';

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
