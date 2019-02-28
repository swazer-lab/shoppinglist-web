import * as React from 'react';
import './styles.scss';

interface Props {

}

class ProgressBar extends React.Component<Props> {
	render() {
		return (
			<div className='progress_bar_component'>
				<div className='progress_bar_component__label' />
			</div>
		);
	}
}

export default ProgressBar;
