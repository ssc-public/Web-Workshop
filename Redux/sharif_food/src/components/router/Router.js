import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RouterWrapper from './RouterWrapper';
import { Loading } from '../common/commonComponents';

const App = lazy(() => import('../app/App'));

const RootRouter = React.memo(() => {
    return (
        <Router>
            <RouterWrapper>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route exact path="/" component={App} />
                    </Switch>
                </Suspense>
            </RouterWrapper>
        </Router>
    );
});
export default RootRouter;
