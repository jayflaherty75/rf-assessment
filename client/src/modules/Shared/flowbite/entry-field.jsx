import React from 'react';
import PropTypes  from 'prop-types';

const EntryField = ({ description, buttonText, name, value, onChange, onSubmit }) => (
    <form>
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">{description}</label>
        <div className="relative">
            <input type="search" id={name} name={name} value={value} onChange={onChange} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={description} required></input>
            <button type="submit" onClick={onSubmit} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{buttonText}</button>
        </div>
    </form>
);

EntryField.propTypes = {
    description: PropTypes.string,
    buttonText: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onSubmit: PropTypes.func
};

export default EntryField;
