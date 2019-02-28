import * as React from 'react';
import {connect} from 'react-redux';

import {AppState, Location} from '../../types/store';
import {navigate} from "../../actions/service";
import {changeEmail, forgotPassword} from "../../actions/auth";

interface Props {
    email: string,
    dispatch: Function,
}

const ForgotPassword = (props: Props) => {
    const { email, dispatch} = props;

    const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));

    return (
        <div>
            <input value={email} onChange={handleChangeEmail} />
            <button onClick={() => props.dispatch(forgotPassword(email))}>ForgotPassword</button>
        </div>
    );
};

const mapStateToProps = (state: AppState) => {

    const { email } = state.auth;

    return {
        email,
    };
};

export default connect(mapStateToProps)(ForgotPassword);
