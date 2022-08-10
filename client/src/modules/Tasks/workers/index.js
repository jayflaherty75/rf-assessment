import * as workers from 'modules/App/middleware/workers';
import { taskCleanupWorker } from './task-cleanup-worker';
import { saveTasksWorker } from './save-tasks-worker';

// Remove tasks when the entire list has been deleted
workers.on('lists/delete', taskCleanupWorker);

// Save state of all tasks
//workers
workers.on('tasks/create', saveTasksWorker)
workers.on('tasks/update', saveTasksWorker)
workers.on('tasks/updateIsDone', saveTasksWorker)
workers.on('tasks/prioritize', saveTasksWorker)
workers.on('tasks/delete', saveTasksWorker);
