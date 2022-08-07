import { on } from 'modules/App/middleware/workers';
import { invalidateListWorker } from './invalidate-list-worker';
import { invalidateTopicWorker } from './invalidate-topic-worker';

// Invalidate list breadcrumb when list is deleted
on('lists/delete', invalidateListWorker);

// Invalidate topic breadcrumb when topic is deleted
on('topics/delete', invalidateTopicWorker);
