import * as workers from 'modules/App/middleware/workers';
import { taskCleanupWorker } from './task-cleanup-worker';
import { saveTasksWorker } from './save-tasks-worker';

// Remove tasks when the entire list has been deleted
workers.on('lists/delete', taskCleanupWorker);

// Save state of all tasks
//workers
workers
    .on('tasks/create', saveTasksWorker)
    .on('tasks/update', saveTasksWorker)
    .on('tasks/updateIsDone', saveTasksWorker)
    .on('tasks/prioritize', saveTasksWorker)
    .on('tasks/delete', saveTasksWorker);
