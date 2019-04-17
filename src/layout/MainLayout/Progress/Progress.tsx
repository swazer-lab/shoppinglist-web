import React from 'react';
import classNames from 'classnames';
import { State as ServiceState } from '../../../types/service';
import './styles.scss';

interface Props {
	progress: ServiceState['progress'],
}

const Progress = (props: Props) => {
	const { progress } = props;

	const progressClassNames = classNames('progress', { progress_show: progress.visible });

	const renderProgress = () => progress.visible && (
		<>
			<div className='progress__spinner' />
			<span className='progress__message'>{progress.message}</span>
		</>
	);

	return (
		<div className={progressClassNames}>
			{renderProgress()}
		</div>
	);
};

export default Progress;
