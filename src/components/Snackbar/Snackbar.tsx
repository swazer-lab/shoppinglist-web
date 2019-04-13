import React from 'react';

import { AppState } from '../../types/store';

import Button from '@material-ui/core/Button';
import MaterialSnackbar from '@material-ui/core/Snackbar';

import './styles.scss';

interface Props {
	visible: boolean,
	message?: string,
	actions?: AppState['service']['snackbar']['actions'],
	duration?: number,

	onRequestClose: () => void,
}

const Snackbar = (props: Props) => {
	const { visible, message, actions, duration, onRequestClose } = props;

	return (
		<MaterialSnackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			open={visible}
			autoHideDuration={duration}
			onClose={onRequestClose}
			message={(<span className='snackbar_component__message'>{message}</span>)}
			action={[
				actions && actions.map((action, index) => (
					<Button key={index} color="default" size='medium' onClick={action.onClick}>
						<span className='snackbar_component__button'>{action.title}</span>
					</Button>
				)),
			]}
		/>
	);
};

export default Snackbar;
