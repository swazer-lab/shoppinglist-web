import { State as ServiceState } from './service';
import { State as AuthState } from './auth';
import { State as ProfileState } from './profile';
import { State as CartsState } from './carts';
import { State as ContactsState } from './contacts';

import { Action, AnyAction, Dispatch } from 'redux';

export interface AppState {
	service: ServiceState,
	auth: AuthState,
	profile: ProfileState,
	carts: CartsState,
	contacts: ContactsState
}

export interface Location {
	hash: string,
	pathname: string,
	search: string,
	state: any,
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
	dispatch: Dispatch<A>
}
