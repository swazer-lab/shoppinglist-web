import React from 'react';
import classNames from 'classnames';

import './styles.scss';

interface Props {
	children?: any,

	isVisible: boolean,
	onCloseModalClick: (e?: any) => void,

	title: string,
	buttons?: Array<{ iconName: string, onClick: (e?: any) => void }>
}

const Modal = (props: Props) => {
	const { children, isVisible, onCloseModalClick, title, buttons } = props;

	const containerClassNames = classNames('modal_component__container', { modal_component__container_visible: isVisible });
	const contentContainerClassNames = classNames('modal_component__content_container', { modal_component__content_container_visible: isVisible });

	const headerClassNames = classNames('modal_component__header', { modal_component__header: isVisible });

	return (
		<div className={containerClassNames} onClick={onCloseModalClick}>
			<div className={contentContainerClassNames} onClick={(e: any) => e.stopPropagation()}>
				<div className={headerClassNames}>
					<span>{title}</span>
					<div className='modal_component__actions_container'>
						{buttons && buttons.map((button) => (
							<i className='material-icons' onClick={button.onClick}>
								{button.iconName}
							</i>
						))}
					</div>
				</div>

				<div className='modal_component_body'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
