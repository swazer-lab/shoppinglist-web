import { State, Action, ActionTypes } from './types';

const INITIAL_STATE: State = {
    accessToken: null,

    email: '',
    password: '',
};

export default (state: State = INITIAL_STATE, action: Action): State => {
    switch (action.type) {
        case ActionTypes.login_result:
            return {
                ...state,
            };

        default:
            return state;
    }
}
