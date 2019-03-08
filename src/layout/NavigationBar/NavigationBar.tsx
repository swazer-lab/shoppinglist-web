import React from 'react';
import { State as ServiceState } from '../../types/service';

import './styles.scss';
import language from '../../assets/language';

interface Props {
	progress: ServiceState['progress']
}

const NavigationBar = (props: Props) => {
	const { progress } = props;

	return (
		<div className='navigation_bar'>
			<div className='navigation_bar__progress'>
				{progress.visible &&
				<>
					<div className='navigation_bar__progress__spinner' />
					<span className='navigation_bar__progress__message'>{progress.message}</span>
				</>
				}
			</div>
			<div className='navigation_bar__search_bar'>
				<i className='material-icons navigation_bar__search_bar__icon'>search</i>
				<input
					className='navigation_bar__search_bar__input'
					type='text'
					placeholder={language.textEnterSearchQuery}
				/>
			</div>
			<div className='navigation_bar__auth'>
				<div className='navigation_bar__auth__photo' />
			</div>
		</div>
	);
};

export default NavigationBar;
