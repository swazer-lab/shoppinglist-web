import { State as ServiceState } from './service';
import { State as AuthState } from './auth';
import { State as ProfileState } from './profile';
import { State as CartsState } from './carts';
import { State as ContactsState } from './contacts';
import { State as StorageState } from './storage';

// App State
export interface AppState {
	service: ServiceState,
	auth: AuthState,
	profile: ProfileState,
	carts: CartsState,
	contacts: ContactsState,
	storage: StorageState
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
	| 'ChangePassword'
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
