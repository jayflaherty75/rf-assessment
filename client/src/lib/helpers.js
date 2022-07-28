const isValidDate = d => !isNaN(Date.parse(d));
const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));

export {
    isValidDate,
    delay
};
