import React from 'react';
import PropTypes from 'prop-types';

const If = ({ exp, children }) => {
    const childrenArr = React.Children.toArray(children);

    return (
        childrenArr.map((child, index) => 
            React.isValidElement(child)
                ? React.cloneElement(child, { key: index, exp })
                : null
        )
    );
}
If.propTypes = {
    exp: PropTypes.bool.isRequired
};

const Then = ({ exp, children }) => exp ? children : null;

const Else = ({ exp, children }) => !exp ? children : null;

export { Then, Else };
export default If;
