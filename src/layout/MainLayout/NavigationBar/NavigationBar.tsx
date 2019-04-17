import React from 'react';
import { State as ServiceState } from '../../../types/service';

import { Progress, SearchBar } from '../';

import './styles.scss';

interface Props {
	progress: ServiceState['progress'],

	profilePhotoUrl?: string,
	profileAvatarUrl?: string,

	searchQuery?: string,

	onOpenProfileModalClick: () => void,
	onSearchQueryChange: (searchQuery: string) => void
	onFilterClick: () => void
}

const NavigationBar = (props: Props) => {
	const { progress, profilePhotoUrl, profileAvatarUrl, searchQuery, onOpenProfileModalClick, onSearchQueryChange, onFilterClick } = props;

	return (
		<div className='navigation_bar'>

			<Progress progress={progress} />
			<SearchBar onSearchQueryChange={onSearchQueryChange} onFilterClick={onFilterClick}
			           searchQuery={searchQuery} />
			<div className='navigation_bar__auth' onClick={onOpenProfileModalClick}>
				<img
					className='navigation_bar__auth__photo'
					src={profilePhotoUrl ? profilePhotoUrl : profileAvatarUrl}
				/>
			</div>
		</div>
	);
};

export default NavigationBar;
