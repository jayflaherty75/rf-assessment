import React from 'react';
import PropTypes from 'prop-types';

const hasCase = ({ props }) => typeof props.value !== 'undefined';

const mapCaseValue = ({ props }) => props.value;

const Switch = ({ exp, children }) => {
    const childrenArr = React.Children.toArray(children);
    const options = new Set(childrenArr.filter(hasCase).map(mapCaseValue));

    return (
        childrenArr.map((child, index) => 
            React.isValidElement(child)
                ? React.cloneElement(child, { key: index, exp, options })
                : null
        )
    );
}
Switch.propTypes = {
    exp: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

const Case = ({ exp, value, children }) => exp === value ? children : null;

const Default = ({ exp, options, children }) => !options.has(exp) ? children : null;

export { Case, Default };
export default Switch;
