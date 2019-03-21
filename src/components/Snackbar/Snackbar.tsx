import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { AppState } from '../../types/store';

import { Button } from '../../components';
import './styles.scss';

interface Props {
	children?: any,

	visible: boolean,
	message: string,
	actions?: AppState['service']['snackbar']['actions'],
	duration?: number,

	onRequestClose: () => void,
}

const Snackbar = (props: Props) => {
	const { children, visible, message, actions, duration, onRequestClose } = props;

	const [info, setInfo] = useState({ message, actions });
	const [timer, setTimer] = useState(-1);

	useEffect(() => {
		if (visible) {
			setInfo({ message, actions });

			const interval = setInterval(() => {
				onRequestClose();
			}, duration);
			setTimer(interval);
		} else {
			clearInterval(timer);

			setTimeout(() => {
				setInfo({ message, actions });
			}, 500);
			setTimer(-1);
		}
	}, [visible]);

	const renderActions = () => (info.actions && info.actions.map((action, index) => (
		<Button
			key={index}
			mode='text'
			accentColor='white'
			type='button'
			title={action.title}
			onClick={action.onClick}
		/>
	)));

	return (
		<div>
			{children}

			<div className={classNames('snackbar_component', { snackbar_component_open: visible })}>
				<span>{info.message}</span>
				{renderActions()}
			</div>
		</div>
	);
};

export default Snackbar;
