import * as workers from 'modules/App/middleware/workers';
import { invalidateListWorker } from './invalidate-list-worker';
import { invalidateTopicWorker } from './invalidate-topic-worker';
import { detectConnectWorker } from './detect-connect-worker';
import { detectDisconnectWorker } from './detect-disconnect-worker';

// Invalidate list breadcrumb when list is deleted
workers.on('lists/delete', invalidateListWorker);

// Invalidate topic breadcrumb when topic is deleted
workers.on('topics/delete', invalidateTopicWorker);

// Keep app up-to-date on connection status
window.addEventListener('online', detectConnectWorker);
window.addEventListener('offline', detectDisconnectWorker);
