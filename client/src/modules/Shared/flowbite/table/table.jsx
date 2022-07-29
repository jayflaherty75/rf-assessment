import React from 'react';

const Table = ({ children }) => (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
                {children}
            </tbody>
        </table>
    </div>
);

export default Table;
