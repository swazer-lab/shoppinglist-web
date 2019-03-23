import { useEffect, useState } from 'react';
import { Localstorage, LocalstorageListener } from '../types/store';

const initialStorage: Localstorage = {
	isLoggedIn: false,
	accessToken: '',
	isEmailConfirmed: false,
	activeLanguage: 'en',
};

const localstorage = ((initialStorage: Localstorage) => {
	let storage: Localstorage = { ...initialStorage };
	let listeners: LocalstorageListener[] = [];

	const rehydrateStorage = () => {
		const keys = Object.keys(initialStorage);
		keys.forEach((key: any) => {
			const value = localStorage.getItem(key);
			if (value === null) {
				// @ts-ignore
				setItem(key, initialStorage[key]);
			} else {
				// @ts-ignore
				storage[key] = typeof initialStorage[key] === 'number' ? Number(value) : typeof initialStorage[key] === 'boolean' ? value === 'true' : String(value);
			}
		});
	};

	const setItem = (key: keyof Localstorage, value: any) => {
		localStorage.setItem(key, String(value));

		// @ts-ignore
		storage[key] = typeof initialStorage[key] === 'number' ? Number(value) : typeof initialStorage[key] === 'boolean' ? value === 'true' : String(value);
		listeners.forEach((listener: LocalstorageListener) => listener(storage));
	};

	const subscribe = (listener: LocalstorageListener) => {
		listeners.push(listener);
		listener(storage);

		return () => {
			listeners = listeners.filter((l: LocalstorageListener) => l !== listener);
		};
	};

	rehydrateStorage();
	return { setItem, subscribe };
})(initialStorage);

const useLocalStorageSubscription = (listener: LocalstorageListener) => {
	useEffect(() => {
		const subscription = localstorage.subscribe(listener);
		return () => {
			subscription();
		};
	});
};

const useLocalStorage = (): Localstorage => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [accessToken, setAccessToken] = useState<string>('');
	const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);
	const [activeLanguage, setActiveLanguage] = useState<Localstorage['activeLanguage']>('en');

	useLocalStorageSubscription((storage: Localstorage) => {
		setIsLoggedIn(Boolean(storage.isLoggedIn));
		setAccessToken(storage.accessToken);
		setIsEmailConfirmed(Boolean(storage.isEmailConfirmed));
		setActiveLanguage(storage.activeLanguage);
	});

	return { isLoggedIn, accessToken, isEmailConfirmed, activeLanguage };
};

export { localstorage, useLocalStorage, useLocalStorageSubscription };
