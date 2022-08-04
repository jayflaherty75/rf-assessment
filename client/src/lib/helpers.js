import { v4 as uuid } from 'uuid';

const _parseDate = d => d ? Date.parse(d) : 0;
const sortByUpdated = (data) => data.sort(
    (d1, d2) => _parseDate(d2.updated) - _parseDate(d1.updated)
);

const generateId = () => uuid();

const isValidDate = d => !isNaN(Date.parse(d));

const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));

const truncate = (str, len) => {
    return (str || {}).length > len ? `${str.substring(0, len - 2)}...` : str;
};

const debounce = (func, timeout = 300) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export {
    sortByUpdated,
    generateId,
    isValidDate,
    delay,
    truncate,
    debounce
};
