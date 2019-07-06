import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '../../components'

interface Props {
		isShow: boolean

		onCancel: () => void
		onLogout: () => void
}

const ConfirmLogout = (props: Props) => {
		const { isShow, onCancel, onLogout } = props;

		return <Dialog open={isShow} onClose={onCancel}>
				<DialogTitle>
						<div className="cart-update-discard-dialoag-title">
								Are you sure you want to exit the app?
						</div>
				</DialogTitle>

				<DialogActions>
						<Button title="Cancel" onClick={onCancel} accentColor="white" />

						<Button title="LOGOUT" onClick={onLogout} />
				</DialogActions>
		</Dialog>
}

export default ConfirmLogout;
