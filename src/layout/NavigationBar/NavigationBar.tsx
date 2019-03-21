import React from 'react';
import { State as ServiceState } from '../../types/service';

import './styles.scss';
import SearchBar from './SearchBar';

interface Props {
	progress: ServiceState['progress'],

	profilePhotoUrl?: string,
	onOpenProfileModalClick: () => void,
	onSearchQueryChange: (searchQuery: string) => void
	onFilterClick: () => void
}

const NavigationBar = (props: Props) => {
	const { progress, profilePhotoUrl, onOpenProfileModalClick, onSearchQueryChange, onFilterClick } = props;

	const renderProgress = () => progress.visible && (
		<>
			<div className='navigation_bar__progress__spinner'/>
			<span className='navigation_bar__progress__message'>{progress.message}</span>
		</>
	);

	return (
		<div className='navigation_bar'>
			<div className='navigation_bar__progress'>
				{renderProgress()}
			</div>
			<SearchBar onSearchQueryChange={onSearchQueryChange} onFilterClick={onFilterClick}/>
			<div className='navigation_bar__auth' onClick={onOpenProfileModalClick}>
				<img className='navigation_bar__auth__photo' src={profilePhotoUrl}/>
			</div>
		</div>
	);
};

export default NavigationBar;
