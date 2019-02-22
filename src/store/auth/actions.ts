import { Action, ActionTypes } from './types';

export const login = (email: string, password: string): Action => ({
    type: ActionTypes.login,
    email,
    password,
});
