import React, { useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { Icon } from '../index';

import 'react-toastify/dist/ReactToastify.css';
import './styles.scss'

import { AlertType } from '../../types/service';

interface Props {
	visible: boolean,
	message: string,
	type: AlertType,
	handleCloseToastr: () => void,
}

const Alert = (props: Props) => {
	const { visible, type, message, handleCloseToastr } = props;

	useEffect(() => {
		const options = {
			autoClose: 2000,
			type: getToastrType(type),
			transition: Slide,
			closeButton: false
		};

		if (visible) {
			toast(Content, options);
		}

		return () => {
			handleCloseToastr();
		};
	}, [visible]);

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

	const getToastTypeToIcon = (type: AlertType) => {
		switch ( type ) {
			case 'warn':
				return 'warning';
			case 'success':
				return 'check';
			default: return type
		}
	}

	const Content = (handler: any) =>  {
		const iconName = getToastTypeToIcon(type)

		return <div className="__alert-container">
			<Icon name={iconName} />

			<span className="__message">
				{ message }
			</span>

			<Icon name={'close'} onClick={handler.closeToast} />
		</div>
	}

	return (
		<ToastContainer />
	);
};

export default Alert;
