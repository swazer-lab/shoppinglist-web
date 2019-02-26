import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

interface Props {

}

class Register extends React.Component<Props> {
	render() {
		return (
			<div>
				<h4>Hi, Register Component!</h4>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(Register);
