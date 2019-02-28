import * as React from 'react';
import {connect} from 'react-redux';

import {AppState, Location} from '../../types/store';
import {navigate} from "../../actions/service";
import {changeEmail, confirmEmail} from "../../actions/auth";

interface Props {
    isEmailConfirmed: boolean;
    dispatch: Function,
    location: Location,
}

class ConfirmEmail extends React.Component<Props> {


    render() {
        return (
            <div>
                <button>Forgot Password</button>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {

    const { isEmailConfirmed } = state.auth;

    return {
        isEmailConfirmed,
    };
};

export default connect(mapStateToProps)(ConfirmEmail);
