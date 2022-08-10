import { put } from 'modules/App/middleware/workers';
import { actionIsOnline } from '../actions';

export const detectDisconnectWorker = async () => {
    await put(actionIsOnline(false));
    await put({
        type: 'alert/message',
        payload: {
            level: 'warn',
            message: 'You are offline',
        }
    });
};
