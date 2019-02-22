import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './Landing/Landing';
import Carts from './Carts/Carts';
import Items from './Items/Items';

import NotFound from './Other/NotFound';
import PrivacyPolicy from './Other/PrivacyPolicy';
import ServiceTerms from './Other/ServiceTerms';

interface Props {
}

class App extends React.Component<Props> {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/carts" component={Carts} />
                    <Route path="/items" component={Items} />

                    <Route path="/privacy" component={PrivacyPolicy} />
                    <Route path="/terms" component={ServiceTerms} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;
