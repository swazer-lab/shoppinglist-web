import React, { FormEvent, useEffect, useState } from 'react';
import language from '../../assets/language';
import classNames from 'classnames';
import { AppState } from '../../types/store';
import { connect } from 'react-redux';
import { Cart } from '../../types/api';
import CartObject from '../../pages/Carts/CartObject';

interface Props {
	onSearchQueryChange: (searchQuery: string) => void
	onFilterClick: () => void
	filteredCarts?: Array<Cart>,
}

const SearchBar = (props: Props) => {
	const [isSearchingStatus, setIsSearchingStatus] = useState(false);

	const { onSearchQueryChange, onFilterClick, filteredCarts } = props;

	const handleSearchQueryChange = (e: FormEvent<HTMLInputElement>) => onSearchQueryChange(e.currentTarget.value);
	const onFilterClicked = () => onFilterClick();

	const handleFocus = () =>  setIsSearchingStatus(true);
	const onSearchContainerClicked = () => setIsSearchingStatus(false);

	const containerClassNames = classNames('search_bar_container', { search_bar_container_visible: isSearchingStatus });


	return (
		<>
			<div onClick={onSearchContainerClicked} className={containerClassNames}>

			</div>
			<div className='navigation_bar__search_bar'>
				<div onClick={onFilterClicked}>
					<i className='material-icons navigation_bar__search_bar__icon'>search</i>
				</div>
				<input
					className='navigation_bar__search_bar__input'
					type='text'
					placeholder={language.textEnterSearchQuery}
					onChange={handleSearchQueryChange}
					onFocus={handleFocus}
				/>
			</div>
		</>
	);
};

const mapStateToProps = (state: AppState) => {
	const { filteredCarts } = state.carts;

	return {
		filteredCarts
	};
};

export default connect(mapStateToProps)(SearchBar);


