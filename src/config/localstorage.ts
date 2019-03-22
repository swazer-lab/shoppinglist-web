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
		Object.keys(initialStorage).forEach((key) => {
			const value = localStorage.getItem(key);

			if (value !== null) {
				// @ts-ignore
				storage[key] = value;
			} else {
				// @ts-ignore
				localStorage.setItem(key, initialStorage[key]);
			}
			listeners.filter((listener: LocalstorageListener) => {
				listener(storage);
			});
		});
	};
	rehydrateStorage();

	const getStorage = () => storage;
	const getItem = (key: keyof Localstorage) => storage[key];

	const setItem = (key: keyof Localstorage, value: any) => {
		localStorage.setItem(key, value);
		storage[key] = value;

		listeners.forEach((listener: LocalstorageListener) => listener(storage));
	};

	const subscribe = (listener: LocalstorageListener) => {
		listeners.push(listener);
		listener(storage);
		return () => {
			listeners = listeners.filter((l: LocalstorageListener) => l !== listener);
		};
	};

	return { getStorage, getItem, setItem, subscribe };
})(initialStorage);

const useLocalStorage = (): Localstorage => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [accessToken, setAccessToken] = useState<string>('');
	const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);
	const [activeLanguage, setActiveLanguage] = useState<Localstorage['activeLanguage']>('en');

	useEffect(() => {
		const handleStorageChange = (storage: Localstorage) => {
			setIsLoggedIn(storage.isLoggedIn);
			setAccessToken(storage.accessToken);
			setIsEmailConfirmed(storage.isEmailConfirmed);
			setActiveLanguage(storage.activeLanguage);
		};

		const listener = localstorage.subscribe(handleStorageChange);
		return () => {
			listener();
		};
	}, []);

	return { isLoggedIn, accessToken, isEmailConfirmed, activeLanguage };
};

export { localstorage, useLocalStorage };
