import React, { useEffect } from 'react';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AlertType } from '../../types/service';

interface Props {
	visible: boolean,
	message: string,
	type: AlertType,
	handleCloseToastr: () => void,
}

const Alert = (props: Props) => {
	const { visible, type, message, handleCloseToastr } = props;

	const getToastrType = (type: AlertType) => {
		switch(type) {
			case 'info':
				return toast.TYPE.INFO;
				break;
			case 'warn':
				return toast.TYPE.WARNING;
				break;
			case 'error':
				return toast.TYPE.ERROR;
				break;
			case 'success':
				return toast.TYPE.SUCCESS;
				break;
		}
	};

	useEffect(() => {
		const options = {
			autoClose: 2000,
			type: getToastrType(type),
			transition: Slide
		};

		if (visible) {
			toast(message, options);
		}

		return () => {
			handleCloseToastr();
		};
	}, [visible]);

	return (
		<ToastContainer />
	);
};

export default Alert;
