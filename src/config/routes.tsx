import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing/Landing';
import Carts from '../pages/Carts/Carts';
import Items from '../pages/Items/Items';

import PrivacyPolicy from '../pages/Other/PrivacyPolicy';
import ServiceTerms from '../pages/Other/ServiceTerms';
import NotFound from '../pages/Other/NotFound';

const Routes = () => (
    <>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/carts" component={Carts} />
            <Route path="/items" component={Items} />

            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms" component={ServiceTerms} />
            <Route component={NotFound} />
        </Switch>
    </>
);

export default Routes;
