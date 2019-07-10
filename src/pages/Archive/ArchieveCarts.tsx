import React, { useEffect } from 'react';
import { Cart } from '../../types/api';
import { fetchArchieveCards } from '../../actions/carts';
import { AppState } from '../../types/store';
import { connect } from 'react-redux';
import ArchievedCardsObject from './ArchievedCardsObject';


interface Props {
		dispatch: Function,
		progress: AppState['service']['progress'],
		destinationCarts: Cart[],

		isLoading: boolean,
		totalCount: number,
		pageNumber: number,

		isLoggedIn: boolean,
		accessToken: string
}

const ArchivedCarts = (props: Props) => {
		const { dispatch, destinationCarts } = props;

		useEffect(() => {
						dispatch(fetchArchieveCards(false, 'merge', 1))
		}, []);

		useEffect(() => {
				const handleScroll = () => {
						const { dispatch, destinationCarts, isLoading, totalCount, pageNumber } = props;
						const reachedEnd = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
						const shouldFetchCarts = !isLoading && destinationCarts.length < totalCount;

						if (reachedEnd && shouldFetchCarts) {
								dispatch(fetchArchieveCards(false, 'merge', pageNumber + 1));
						}
				};

				window.addEventListener('scroll', handleScroll);
				return () => {
						window.removeEventListener('scroll', handleScroll);
				};
		});


		const renderListCarts = () => destinationCarts.map((cart) => (
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
		const { isLoading, totalCount, pageNumber, destinationCarts } = state.carts;

		return {
				progress,
				destinationCarts,
				isLoading,
				totalCount,
				pageNumber,
		};
};

export default connect(mapStateToProps)(ArchivedCarts);
