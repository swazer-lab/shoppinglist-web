import React, { useEffect } from 'react';
import { Cart } from '../../types/api';
import { FetchArchieveCards } from '../../actions/archieveCarts';
import { AppState } from '../../types/store';
import { connect } from 'react-redux';
import ArchievedCardsObject from './ArchievedCardsObject';


interface Props {
		dispatch: Function,
		progress: AppState['service']['progress'],
		carts: Cart[],

		isLoading: boolean,
		totalCount: number,
		pageNumber: number,

		isLoggedIn: boolean,
		accessToken: string
}

const ArchivedCarts = (props: Props) => {
		const { dispatch, carts, progress } = props;

		useEffect(() => {
						dispatch(FetchArchieveCards(false, 'merge', 1))
		}, []);

		useEffect(() => {
				const handleScroll = () => {
						const { dispatch, carts, isLoading, totalCount, pageNumber } = props;
						const reachedEnd = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
						const shouldFetchCarts = !isLoading && carts.length < totalCount;

						if (reachedEnd && shouldFetchCarts) {
								dispatch(FetchArchieveCards(false, 'merge', pageNumber + 1));
						}
				};

				window.addEventListener('scroll', handleScroll);
				return () => {
						window.removeEventListener('scroll', handleScroll);
				};
		});


		const renderListCarts = () => carts.map((cart) => (
				<ArchievedCardsObject
						key={cart.uuid}
						cart={cart}
				/>
		));

		return (
				<div>
						{renderListCarts()}
				</div>
		);
};

ArchivedCarts.layoutOptions = {
		title: 'Carts',
		layout: 'Main',
		authorized: true,
};


const mapStateToProps = (state: AppState) => {
		const { progress } = state.service;
		const { carts, isLoading, totalCount, pageNumber } = state.archieveCarts;

		return {
				progress,
				carts,
				isLoading,
				totalCount,
				pageNumber,
		};
};

export default connect(mapStateToProps)(ArchivedCarts);
