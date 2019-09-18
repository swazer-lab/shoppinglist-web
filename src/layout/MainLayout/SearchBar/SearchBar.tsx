import React, { FormEvent, useState } from 'react';
import language from '../../../assets/language';
import classNames from 'classnames';
import { AppState } from '../../../types/store';
import { connect } from 'react-redux';
import { Cart } from '../../../types/api';

import SearchResultObject from './SearchResultObject';
import './styles.scss';

interface Props {
		searchQuery?: string,
		isOpen: boolean,
		onSearchQueryChange: (searchQuery: string) => void,
		onFilterClick: () => void,
		onCloseSearchBar: () => void,
		filteredCarts?: Array<Cart>,
		isShowSideBar?: boolean
}

const SearchBar = (props: Props) => {
		const [isSearchingStatus, setIsSearchingStatus] = useState(false);

		const { onSearchQueryChange, onFilterClick, filteredCarts, searchQuery, isOpen, onCloseSearchBar, isShowSideBar } = props;

		const handleSearchQueryChange = (e: FormEvent<HTMLInputElement>) => {
				onSearchQueryChange(e.currentTarget.value);
				onFilterClicked();
		};

		const onFilterClicked = () => {
				onFilterClick();
		};


		const handleFocus = () => setIsSearchingStatus(true);
		const onSearchContainerClicked = () => {
				setIsSearchingStatus(false);
				onSearchQueryChange('');
				onFilterClick();
		};

		const containerClassNames = classNames('search_bar_container', { search_bar_container_visible: isSearchingStatus });
		const searchBarClassName = classNames('search_bar', { search_bar_visible: isOpen });

		const searchBarSideBarVisibleClassName = classNames('search_bar', { search_bar_side_bar_visible: isShowSideBar });
		const searchBarCartsClassName = classNames('search_bar_carts', { search_bar_carts_side_bar_visible: isShowSideBar });

		const inputClassName = classNames('search_bar__input', { search_bar__input_visible: isOpen });

		const searchBarIconClassName = classNames('search_bar__icon', { search_bar__icon_visible: isOpen });
		const searchBarCloseIconClassName = classNames('search_bar__close', { search_bar__close_visible: isOpen });

		const renderCarts = () => filteredCarts!.map((cart) => (
				<SearchResultObject
						key={cart.id}
						cart={cart}
				/>
		));

		return (
				<>
						<div onClick={onSearchContainerClicked} className={containerClassNames}>
								<div className={searchBarCartsClassName} style={{ margin: '65px' }}>
										{renderCarts()}
								</div>
						</div>
						<div className={isShowSideBar ? searchBarSideBarVisibleClassName : searchBarClassName}>
								<div onClick={onFilterClicked} className={searchBarIconClassName}>
										<i className='material-icons search_bar__icon'>search</i>
								</div>
								<div onClick={onCloseSearchBar} className={searchBarCloseIconClassName}>
										<i className='material-icons'>arrow_left</i>
								</div>
								<input
										className={inputClassName}
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


