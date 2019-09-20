import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { Cart } from '../../types/api';
import { removeCart, setDestinationCart } from '../../actions/carts';
import { fetchArchieveCards, pullArchiveCarts, pushArchiveCarts, reorderArchivedCart } from '../../actions/archieveCarts';

import { AppState } from '../../types/store';
import { connect } from 'react-redux';
import ArchievedCardsObject from './ArchievedCardsObject';
import { hideSnackbar, showSnackbar } from '../../actions/service';
import language from '../../assets/language';

interface Props {
		dispatch: Function,
		progress: AppState['service']['progress'],
		snackbar: AppState['service']['snackbar'],
		carts: Cart[],

		isLoading: boolean,
		totalCount: number,
		pageNumber: number,

		isLoggedIn: boolean,
		accessToken: string,
		isOpenSideBar?: boolean
}

const ArchivedCarts = (props: Props) => {
		const { dispatch, carts, isOpenSideBar, snackbar } = props;

		useEffect(() => {
				dispatch(fetchArchieveCards(false, 'replace', 1));
		}, []);

		useEffect(() => {
				const handleScroll = () => {
						const { dispatch, carts, isLoading, totalCount, pageNumber } = props;
						const reachedEnd = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
						const shouldFetchCarts = !isLoading && carts.length < totalCount;

						if (reachedEnd && shouldFetchCarts) {
								dispatch(fetchArchieveCards(false, 'merge', pageNumber + 1));
						}
				};

				window.addEventListener('scroll', handleScroll);
				return () => {
						window.removeEventListener('scroll', handleScroll);
				};
		});

		const onRemoveCartClicked = (cart: Cart) => {
				if (snackbar.visible) {
						dispatch(hideSnackbar());
				}

				const cartIndex = carts.indexOf(cart);

				dispatch(pullArchiveCarts(cartIndex));

				let isUndoClicked = false;

				const onUndoClicked = () => {
						isUndoClicked = true;
						dispatch(hideSnackbar());
						dispatch(pushArchiveCarts(cartIndex, cart));
				};

				dispatch(showSnackbar(language.textRemovingCart, [{
						title: language.actionUndo,
						onClick: onUndoClicked,
				}]));

				setTimeout(() => {
						if (!isUndoClicked) {
								dispatch(hideSnackbar());
								dispatch(removeCart(cart));
						}
				}, 3000);
		};

		const onDragEnd = (result: DropResult) => {
				const { source, destination } = result;


				if (!destination) {
						return;
				}
				if (destination.index === source.index) {
						return;
				}

				const { dispatch, carts } = props;
				const cartId = carts[source.index].id;

				dispatch(reorderArchivedCart(cartId, source.index, destination.index));
		};

		const onRetrieveCartClicked = (cart: Cart) => {
				if (snackbar.visible) {
						dispatch(hideSnackbar());
				}

				const cartIndex = carts.indexOf(cart);

				dispatch(pullArchiveCarts(cartIndex));

				let isUndoClicked = false;

				const onUndoClicked = () => {
						isUndoClicked = true;
						dispatch(hideSnackbar());
						dispatch(pushArchiveCarts(cartIndex, cart));
				};

				dispatch(showSnackbar(language.textRetrievingCart, [{
						title: language.actionUndo,
						onClick: onUndoClicked,
				}]));

				setTimeout(() => {
						if (!isUndoClicked) {
								dispatch(hideSnackbar());
								dispatch(setDestinationCart(cart, cartIndex, false));
						}
				}, 3000);
		};

		const renderArchivedCarts = () => carts.map((cart, index) => (
				<div key={cart.uuid}>
						<Draggable draggableId={cart.uuid} index={index}>
								{(provided) => (
										<div className='cart_object_container'
										     ref={provided.innerRef}
										     {...provided.draggableProps}
										     {...provided.dragHandleProps}
										>
												<ArchievedCardsObject
														key={cart.uuid}
														cart={cart}
														onRemoveCartClick={onRemoveCartClicked}
														onRetrieveCartClick={onRetrieveCartClicked}
												/>
										</div>
								)}
						</Draggable>
				</div>
		));

		return (
				<div className={isOpenSideBar ? 'container__open_side_bar' : 'container'}>
						<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId="list1" direction={'vertical'} key="list1">
										{provided => (
												<div ref={provided.innerRef} {...provided.droppableProps}>
														{renderArchivedCarts()}
														{provided.placeholder}
												</div>
										)}
								</Droppable>
								<div style={{ height: '10px' }}>

								</div>
						</DragDropContext>
				</div>
		);
};

ArchivedCarts.layoutOptions = {
		title: 'ArchivedCarts',
		layout: 'Main',
		authorized: true,
};

const mapStateToProps = (state: AppState) => {
		const { progress, isOpenSideBar, snackbar } = state.service;
		const { isLoading, totalCount, pageNumber, carts } = state.archieveCarts;

		return {
				carts,
				progress,
				isLoading,
				totalCount,
				pageNumber,
				isOpenSideBar,
				snackbar,
		};
};

export default connect(mapStateToProps)(ArchivedCarts);
