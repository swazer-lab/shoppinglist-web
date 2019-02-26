import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/store';

interface Props {
	email: string;
}

class Landing extends Component<Props> {
	render() {
		return <h1>Landing</h1>;
	}
}

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(Landing);
