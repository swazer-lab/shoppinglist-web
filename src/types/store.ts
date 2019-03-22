import { State as ServiceState } from './service';
import { State as AuthState } from './auth';
import { State as ProfileState } from './profile';
import { State as CartsState } from './carts';
import { State as ContactsState } from './contacts';

export interface AppState {
	service: ServiceState,
	auth: AuthState,
	profile: ProfileState,
	carts: CartsState,
	contacts: ContactsState
}

export interface Localstorage {
	isLoggedIn: boolean,
	accessToken: string,
	isEmailConfirmed: boolean,
	activeLanguage: 'en' | 'tr' | 'ar',
}

export type LocalstorageListener = ((storage: Localstorage) => void)
