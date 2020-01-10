import React from 'react';

const RouterWrapper = React.memo(({ children }) => {
    //TODO: add header, sidebar, ... in here
    return <div style={{ width: '100%', height: '100%' }}>{children}</div>;
});
export default RouterWrapper;
