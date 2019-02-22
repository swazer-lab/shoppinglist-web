import * as React from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { AppState } from '../store';
import Routes from '../config/routes';

interface Props {
    store: Store<AppState>
    history: History
}

class Main extends React.Component<Props> {
    public render() {
        const { store, history } = this.props;

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default Main;
