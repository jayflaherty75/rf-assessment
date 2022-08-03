import React from 'react';

const For = ({ data, children }) =>
    data.map((item, index) => (
        React.isValidElement(children)
            ? React.cloneElement(children, { key: index, data, item, index })
            : children
    ));

export default For;
