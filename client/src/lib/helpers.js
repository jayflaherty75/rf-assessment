import { v4 as uuid } from 'uuid';

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
    generateId,
    isValidDate,
    delay,
    truncate,
    debounce
};
