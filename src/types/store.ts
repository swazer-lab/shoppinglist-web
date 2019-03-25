import { State as ServiceState } from './service';
import { State as AuthState } from './auth';
import { State as ProfileState } from './profile';
import { State as CartsState } from './carts';
import { State as ContactsState } from './contacts';

// App State
export interface AppState {
	service: ServiceState,
	auth: AuthState,
	profile: ProfileState,
	carts: CartsState,
	contacts: ContactsState
}

// Local Storage
export interface Localstorage {
	isLoggedIn: boolean,
	accessToken: string,
	isEmailConfirmed: boolean,
	activeLanguage: 'en' | 'tr' | 'ar',
}

export type LocalstorageListener = ((storage: Localstorage) => void)

// Routes
export type RouteName =
	| 'Landing'
	| 'Register'
	| 'Login'
	| 'ConfirmEmail'
	| 'ForgotPassword'
	| 'Carts'
	| 'GetAccess'
	| 'PrivacyPolicy'
	| 'ServiceTerms';

export interface Route {
	name: RouteName,
	path: string,
	Component: any
}
