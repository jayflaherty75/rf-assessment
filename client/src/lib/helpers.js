import uuid from 'uuid';

const generateId = () => uuid.v5();

const isValidDate = d => !isNaN(Date.parse(d));

const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));

export {
    generateId,
    isValidDate,
    delay
};
