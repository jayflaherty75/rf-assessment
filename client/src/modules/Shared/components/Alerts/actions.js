
const actionAlertMessage = (level, message) => ({
    type: 'alert/message',
    payload: { level, message }
});

const actionAlertClose = () => ({
    type: 'alert/close',
});

export {
    actionAlertMessage,
    actionAlertClose,
}