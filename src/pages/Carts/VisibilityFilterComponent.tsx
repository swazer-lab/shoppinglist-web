import React from 'react';

import Button from '../../components/Button/Button';
import { VisibilityFilter } from '../../types/carts';

interface Props {
	visibilityFilter: VisibilityFilter,
	onGetAllCarts : () => void
	onGetActiveCarts : () => void
	onGetCompletedCarts : () => void

}

const VisibilityFilterComponent = (props: Props) => {

	const { visibilityFilter, onGetAllCarts, onGetActiveCarts, onGetCompletedCarts } = props;

    return (
	    <div className='filter_cart'>
		    <Button
			    type='button'
			    accentColor={visibilityFilter === 'All' ? 'primary' : 'white'}
			    title='All'
			    onClick={onGetAllCarts}
			    className='filter_cart__filter_button'
		    />
		    <Button
			    type='button'
			    accentColor={visibilityFilter === 'Active' ? 'primary' : 'white'}
			    title='Active' onClick={onGetActiveCarts}
			    className='filter_cart__filter_button'
		    />
		    <Button
			    type='button'
			    accentColor={visibilityFilter === 'Completed' ? 'primary' : 'white'}
			    title='Completed' onClick={onGetCompletedCarts}
			    className='filter_cart__filter_button'
		    />
	    </div>
    );
};



export default VisibilityFilterComponent;
