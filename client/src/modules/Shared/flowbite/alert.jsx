import React from 'react';
import PropTypes  from 'prop-types';

const styles = {
    'success': 'p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800',
    'info': 'p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800',
    'warning': 'p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800',
    'error': 'p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',
};

const Alert = ({ message, level }) => (
    <div className={styles[level || 'info']} role="alert">
        {message}
    </div>
);

Alert.propTypes = {
    message: PropTypes.string,
    level: PropTypes.string
};

export default Alert;
