import React from 'react';
import { State as ServiceState } from '../../types/service';

import { SearchBar } from '../';

import './styles.scss';

import avatar from '../../assets/images/avatar.jpeg';

interface Props {
	progress: ServiceState['progress'],

	profilePhotoUrl?: string,
	searchQuery?: string,

	onOpenProfileModalClick: () => void,
	onSearchQueryChange: (searchQuery: string) => void
	onFilterClick: () => void
}

const NavigationBar = (props: Props) => {
	const { progress, profilePhotoUrl, onOpenProfileModalClick, onSearchQueryChange, onFilterClick, searchQuery } = props;

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
			<SearchBar onSearchQueryChange={onSearchQueryChange} onFilterClick={onFilterClick} searchQuery={searchQuery}/>
			<div className='navigation_bar__auth' onClick={onOpenProfileModalClick}>
				<img className='navigation_bar__auth__photo' src={profilePhotoUrl ? profilePhotoUrl : avatar}/>
			</div>
		</div>
	);
};

export default NavigationBar;
