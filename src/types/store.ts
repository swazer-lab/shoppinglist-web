import { State as ServiceState } from './service';
import { State as AuthState } from './auth';

import { Action, AnyAction, Dispatch } from 'redux';

export interface AppState {
	service: ServiceState,
	auth: AuthState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
	dispatch: Dispatch<A>
}
