import React from 'react';
import { State as ServiceState } from '../../types/service';

import './styles.scss';
import language from '../../assets/language';

interface Props {
	progress: ServiceState['progress'],

	profilePhotoUrl?: string,
	onOpenProfileModalClick: () => void,
}

const NavigationBar = (props: Props) => {
	const { progress, profilePhotoUrl, onOpenProfileModalClick } = props;

	const renderProgress = () => progress.visible && (
		<>
			<div className='navigation_bar__progress__spinner' />
			<span className='navigation_bar__progress__message'>{progress.message}</span>
		</>
	);

	return (
		<div className='navigation_bar'>
			<div className='navigation_bar__progress'>
				{renderProgress()}
			</div>
			<div className='navigation_bar__search_bar'>
				<i className='material-icons navigation_bar__search_bar__icon'>search</i>
				<input
					className='navigation_bar__search_bar__input'
					type='text'
					placeholder={language.textEnterSearchQuery}
				/>
			</div>
			<div className='navigation_bar__auth' onClick={onOpenProfileModalClick}>
				<img className='navigation_bar__auth__photo' src={profilePhotoUrl} />
			</div>
		</div>
	);
};

export default NavigationBar;
