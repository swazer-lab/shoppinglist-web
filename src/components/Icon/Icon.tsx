import React from 'react';
import classNames from 'classnames';

interface Props {
		name?: string,
		className?: string,
		onClick?: (e?: any) => void
}

const Icon = (props: Props) => {
		const { name, className, onClick } = props;

		return (
				<i
						className={classNames(`material-icons`, className)}
						onClick={onClick}>
						{name}
				</i>
		);
};

export default Icon;
