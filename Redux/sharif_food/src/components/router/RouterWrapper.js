import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Auth from '../auth/Auth';
import { setToken } from '../../actions/authActions';

const RouterWrapper = React.memo(({ children }) => {
    const token = useSelector(state => state.userToken);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setToken(localStorage.getItem('token')));
    }, []);

    return <div style={{ width: '100%', height: '100%' }}>{token ? children : <Auth />}</div>;
});
export default RouterWrapper;
