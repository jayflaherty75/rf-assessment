import { put } from 'modules/App/middleware/workers';
import { actionIsOnline } from '../actions';

export const detectConnectWorker = async () => {
    await put(actionIsOnline(true));
    await put({
        type: 'alert/message',
        payload: {
            level: 'success',
            message: 'You are back online',
        }
    });
};
