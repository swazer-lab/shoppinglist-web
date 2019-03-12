import * as React from 'react';
import classNames from 'classnames';

import './styles.scss';

interface Props {
	isLoading: boolean,
}

class ProgressBar extends React.Component<Props> {
	render() {
		const { isLoading } = this.props;

		const containerClassNames = classNames('progress_bar_component__container', { progress_bar_component__container_loading: isLoading });
		const labelClassNames = classNames('progress_bar_component__label', { progress_bar_component__label_loading: isLoading });

		return (
			<div className={containerClassNames}>
				<div className={labelClassNames} />
			</div>
		);
	}
}

export default ProgressBar;
