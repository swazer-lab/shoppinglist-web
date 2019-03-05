import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppState } from '../types/store';

import { navigate } from '../actions/service';
import { useLocalStorage } from '../config/utilities';

interface Props {
	children: any,
	dispatch: Function,

	layoutOptions: any,
	isLoggedIn: boolean,
}

class Layout extends React.Component<Props> {
	componentDidMount() {
		this.setListenerUp();
	}

	componentDidUpdate(prevProps: Props) {
		this.setListenerUp();
	}

	setListenerUp = () => {
		const layoutOptions = this.props.layoutOptions ? this.props.layoutOptions() : {};
		const { title, authorized } = layoutOptions;

		if (title) document.title = title;
		if (authorized) {
			this.props.dispatch(navigate('Login'));
			return;
		}
	};

	render() {
		const { children } = this.props;
		return (
			<div>
				{children}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	const { isLoggedIn } = useLocalStorage();

	return {
		isLoggedIn,
	};
};

// @ts-ignore
export default withRouter(connect(mapStateToProps)(Layout));
