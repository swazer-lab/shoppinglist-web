export const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const useLocalStorage = (): { accessToken: string, isLoggedIn: boolean, activeLanguage: string } => {
	const accessToken = localStorage.getItem('accessToken') || '';
	const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
	const activeLanguage = localStorage.getItem('activeLanguage') || '';

	return { accessToken, isLoggedIn, activeLanguage };
};
