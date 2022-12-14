import * as workers from 'modules/App/middleware/workers';
import { saveTopicsWorker } from './save-topics-worker';

// Save state of all lists
workers
    .on('topics/create', saveTopicsWorker)
    .on('topics/update', saveTopicsWorker)
    .on('topics/archive', saveTopicsWorker)
    .on('topics/delete', saveTopicsWorker);
