import { on } from 'modules/App/middleware/workers';
import { taskCleanupWorker } from './task-cleanup-worker';
import { saveTasksWorker } from './save-tasks-worker';

// Remove tasks when the entire list has been deleted
on('lists/delete', taskCleanupWorker);

// Save state of all tasks
on('tasks/create', saveTasksWorker);
on('tasks/update', saveTasksWorker);
on('tasks/updateIsDone', saveTasksWorker);
on('tasks/prioritize', saveTasksWorker);
on('tasks/delete', saveTasksWorker);
