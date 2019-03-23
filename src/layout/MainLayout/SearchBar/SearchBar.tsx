import React, { FormEvent, useState } from 'react';
import language from '../../../assets/language';
import classNames from 'classnames';
import { AppState } from '../../../types/store';
import { connect } from 'react-redux';
import { Cart } from '../../../types/api';

import './styles.scss';
import SearchResultObject from './SearchResultObject';

interface Props {
	searchQuery?: string,
	onSearchQueryChange: (searchQuery: string) => void,
	onFilterClick: () => void,
	filteredCarts?: Array<Cart>,
}

const SearchBar = (props: Props) => {
	const [isSearchingStatus, setIsSearchingStatus] = useState(false);

	const { onSearchQueryChange, onFilterClick, filteredCarts, searchQuery } = props;

	const handleSearchQueryChange = (e: FormEvent<HTMLInputElement>) => {
		onSearchQueryChange(e.currentTarget.value);
		onFilterClicked();
	};

	const onFilterClicked = () => onFilterClick();

	const handleFocus = () => setIsSearchingStatus(true);
	const onSearchContainerClicked = () => {
		setIsSearchingStatus(false);
		onSearchQueryChange('');
	};

	const containerClassNames = classNames('search_bar_container', { search_bar_container_visible: isSearchingStatus });

	const renderCarts = () => filteredCarts!.map((cart) => (
		<SearchResultObject
			key={cart.id}
			cart={cart}
		/>
	));

	return (
		<>
			<div onClick={onSearchContainerClicked} className={containerClassNames}>
				<div style={{ margin: '65px' }}>
					{renderCarts()}
				</div>
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
					value={searchQuery}
				/>
			</div>
		</>
	);
};

const mapStateToProps = (state: AppState) => {
	const { filteredCarts } = state.carts;

	return {
		filteredCarts,
	};
};

export default connect(mapStateToProps)(SearchBar);


