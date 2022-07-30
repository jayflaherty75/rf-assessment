import { on } from 'modules/App/middleware/workers';
import { listCleanupWorker } from './list-cleanup-worker';
import { saveListsWorker } from './save-lists-worker';

// Cleanup lists under a topic when it is deleted
on('topics/delete', listCleanupWorker);

// Save state of all lists
on('lists/create', saveListsWorker);
on('lists/update', saveListsWorker);
on('lists/archive', saveListsWorker);
on('lists/delete', saveListsWorker);
