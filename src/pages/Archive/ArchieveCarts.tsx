import React, { useEffect } from 'react';
import { Cart } from '../../types/api';
import { fetchArchieveCards } from '../../actions/carts';
import { AppState } from '../../types/store';
import { connect } from 'react-redux';
import ArchievedCardsObject from './ArchievedCardsObject';

interface Props {
		dispatch: Function,
		progress: AppState['service']['progress'],
		archivedCarts: Cart[],

		isLoading: boolean,
		totalCount: number,
		pageNumber: number,

		isLoggedIn: boolean,
		accessToken: string,
		isShowSideBar?: boolean
}

const ArchivedCarts = (props: Props) => {
		const { dispatch, archivedCarts, isShowSideBar } = props;

		useEffect(() => {
				dispatch(fetchArchieveCards(false, 'replace', 1));
		}, []);

		useEffect(() => {
				const handleScroll = () => {
						const { dispatch, archivedCarts, isLoading, totalCount, pageNumber } = props;
						const reachedEnd = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
						const shouldFetchCarts = !isLoading && archivedCarts.length < totalCount;

						if (reachedEnd && shouldFetchCarts) {
								dispatch(fetchArchieveCards(false, 'merge', pageNumber + 1));
						}
				};

				window.addEventListener('scroll', handleScroll);
				return () => {
						window.removeEventListener('scroll', handleScroll);
				};
		});

		const renderListCarts = () => archivedCarts.map((cart) => (
				<ArchievedCardsObject
						key={cart.uuid}
						cart={cart}
				/>
		));

		return (
				<div className= {isShowSideBar ? 'container__open_side_bar' : 'container'}>
						{renderListCarts()}
				</div>
		);
};

ArchivedCarts.layoutOptions = {
		title: 'ArchivedCarts',
		layout: 'Main',
		authorized: true,
};


const mapStateToProps = (state: AppState) => {
		const { progress, isShowSideBar } = state.service;
		const { isLoading, totalCount, pageNumber, archivedCarts } = state.carts;

		return {
				archivedCarts,
				progress,
				isLoading,
				totalCount,
				pageNumber,
				isShowSideBar
		};
};

export default connect(mapStateToProps)(ArchivedCarts);
