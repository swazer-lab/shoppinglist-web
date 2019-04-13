import * as React from 'react';
import { useEffect, useRef } from 'react';
import classNames from 'classnames';

import './styles.scss';

interface Props {
	className?: string,

	value: string,
	onChange: (e: any) => void,

	type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url',

	autoFoucus?: boolean,
	placeholder: string,
	required?: boolean,
	pattern?: string,
}

const Input = (props: Props) => {

	const { className, value, onChange, type, placeholder, required, pattern, autoFoucus } = props;

	const itemNameRef: React.RefObject<HTMLInputElement> = useRef<any>();

	useEffect(() => {
		if (autoFoucus) {
			if (itemNameRef.current) {
				itemNameRef.current.focus();
			}
		}
	}, []);

	return (
		<div className={classNames('input-component__container', className)}>
			<input
				ref={itemNameRef}
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
