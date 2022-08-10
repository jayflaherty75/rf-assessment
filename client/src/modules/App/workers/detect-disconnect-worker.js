import { put } from 'modules/App/middleware/workers';
import { actionIsOnline } from '../actions';
import { actionAlertMessage } from 'modules/Shared/components/Alerts/actions';

export const detectDisconnectWorker = async () => {
    await put(actionIsOnline(false));
    await put(actionAlertMessage('warn', 'You are offline'));
};
