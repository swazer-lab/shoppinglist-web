import React, { useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
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
		switch (type) {
			case 'info':
				return toast.TYPE.INFO;
			case 'warn':
				return toast.TYPE.WARNING;
			case 'error':
				return toast.TYPE.ERROR;
			case 'success':
				return toast.TYPE.SUCCESS;
		}
	};

	useEffect(() => {
		const options = {
			autoClose: 2000,
			type: getToastrType(type),
			transition: Slide,
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
