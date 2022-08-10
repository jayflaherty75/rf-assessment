import * as workers from 'modules/App/middleware/workers';
import { invalidateListWorker } from './invalidate-list-worker';
import { invalidateTopicWorker } from './invalidate-topic-worker';

// Invalidate list breadcrumb when list is deleted
workers.on('lists/delete', invalidateListWorker);

// Invalidate topic breadcrumb when topic is deleted
workers.on('topics/delete', invalidateTopicWorker);
