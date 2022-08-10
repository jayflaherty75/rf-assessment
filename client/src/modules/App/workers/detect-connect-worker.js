import { put } from 'modules/App/middleware/workers';
import { actionIsOnline } from '../actions';
import { actionAlertMessage } from 'modules/Shared/components/Alerts/actions';

export const detectConnectWorker = async () => {
    await put(actionIsOnline(true));
    await put(actionAlertMessage('success', 'You are back online'));
};
