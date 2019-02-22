import { Action as ReduxAction } from 'redux';

export enum ActionTypes {
    login = 'AUTH__LOGIN',
    login_result = 'AUTH__LOGIN_RESULT',

    register = 'AUTH__REGISTER',
    register_result = 'AUTH__REGISTER_RESULT',
}

type AuthAction = ReduxAction<ActionTypes>;

export interface LoginAction extends AuthAction {
    type: ActionTypes.login;
    email: string;
    password: string;
}

export type Action = LoginAction | AuthAction;

export interface State {
    accessToken: string | null;

    email: string;
    password: string;
}
