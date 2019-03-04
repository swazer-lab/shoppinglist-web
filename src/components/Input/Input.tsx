import * as React from 'react';
import classNames from 'classnames';

import './styles.scss';

interface Props {
	className?: string,

	value: string,
	onChange: (e: any) => void,

	type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url',

	placeholder: string
	required?: boolean,
	pattern?: string,
}

const Input = (props: Props) => {

	const { className, value, onChange, type, placeholder, required, pattern } = props;

	return (
		<div className={classNames('input-component__container', className)}>
			<input
				className='input-component'
				type={type}
				value={value}
				onChange={(e: any) => onChange(e)}
				placeholder={placeholder}
				required={required}
				pattern={pattern}
			/>
		</div>
	);
};

export default Input;
