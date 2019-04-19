import React from 'react';
import { State as ServiceState } from '../../../types/service';

import { Progress, SearchBar } from '../';

import './styles.scss';
import classNames from 'classnames';

interface Props {
	progress: ServiceState['progress'],

	profilePhotoUrl?: string,
	profileAvatarUrl?: string,
	isOpenSearchBar: boolean,
	searchQuery?: string,

	onOpenProfileModalClick: () => void,
	onCloseSearchBar: () => void,
	onSearchQueryChange: (searchQuery: string) => void
	onFilterClick: () => void
}

const NavigationBar = (props: Props) => {
	const { progress, profilePhotoUrl, profileAvatarUrl, searchQuery, onOpenProfileModalClick, onSearchQueryChange, onFilterClick, isOpenSearchBar, onCloseSearchBar } = props;

	const searchBarClassName = classNames('navigation_bar__auth', { navigation_bar__auth_hidden: isOpenSearchBar});

	return (
		<div className='navigation_bar'>
			<Progress progress={progress} />
			<SearchBar onSearchQueryChange={onSearchQueryChange} onFilterClick={onFilterClick}
			           searchQuery={searchQuery} onCloseSearchBar={onCloseSearchBar} isOpen={isOpenSearchBar} />
				<div className={searchBarClassName} onClick={onOpenProfileModalClick}>
					<img
						className='navigation_bar__auth__photo'
						src={profilePhotoUrl ? profilePhotoUrl : profileAvatarUrl}
					/>
				</div>
		</div>
	);
};

export default NavigationBar;
