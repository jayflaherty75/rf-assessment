import React from 'react';
import PropTypes from 'prop-types';

const For = ({ data, children }) =>
    data.map((item, index) => (
        React.isValidElement(children)
            ? React.cloneElement(children, { key: index, data, item, index })
            : children
    ));

For.propTypes = {
    data: PropTypes.array.isRequired
};
    
export default For;
