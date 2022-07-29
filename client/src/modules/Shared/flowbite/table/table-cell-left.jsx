import React from 'react';

const TableCellLeft = ({ children }) => (
    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {children}
    </th>
);

export default TableCellLeft;
