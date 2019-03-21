import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart } from '../../types/api';

import './styles.scss';

interface Props {
	cart: Cart,
}

const SearchResultObject = (props: Props) => {
	const { cart } = props;

	const renderItems = (status: string) => cart.items.filter(item => item.status === status).map(item => (
		<div key={item.uuid} className='search_result_object__items__item'>
			<i
				className='material-icons search_result_object__items__checkbox'
				children={item.status === 'active' ? 'check_box_outline_blank' : 'check_box'}
			/>
			<span className='search_result_object__items__item__title'>{item.title}</span>
		</div>
	));

	return (
		<div className='search_result_object'>
			<h4 className='search_result_object__title'>{cart.title}</h4>

			<div className='search_result_object__items'>
				{renderItems('active')}
				{
					cart.items.filter(item => item.status == 'completed').length !== 0 &&
                    <div className='search_result_object__items__separator'/>
				}
				{renderItems('completed')}
			</div>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(SearchResultObject);
