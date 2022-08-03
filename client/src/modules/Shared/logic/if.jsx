import React from 'react';

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

const Then = ({ exp, children }) => exp ? children : null;

const Else = ({ exp, children }) => !exp ? children : null;

export { Then, Else };
export default If;
