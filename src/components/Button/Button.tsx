import * as React from 'react';
import classNames from 'classnames';

import './styles.scss';

interface Props {
	className?: string,
	accentColor?: 'primary' | 'text',
	mode?: 'normal' | 'text',

	type?: string,
	title: string,
	onClick?: (e?: any) => void,
}

const Button = (props: Props) => {
	const { className, mode, accentColor, type, title, onClick } = props;
	return (
		<button
			className={classNames(`button_component button_component-${mode}-${accentColor}`, className)}
			onClick={onClick}
			type={type}>
			{title}
		</button>
	);
};

Button.defaultProps = {
	accentColor: 'primary',
	mode: 'normal',
};

export default Button;
