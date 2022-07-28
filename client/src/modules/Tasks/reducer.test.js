import reducer from './reducer';
import { isValidDate, delay } from 'lib/helpers';

const payload1 = {
    id: '111',
    listId: '222',
    task: 'Mocked task for unit test'
};

const payload2 = {
    id: '111',
    task: 'Changed task'
};

const payload3 = { ...payload1, id: '222' };
const payload4 = { ...payload1, id: '333' };

describe('Tasks reducer', () => {
    test('creates a valid task', () => {
        const state = reducer({}, {
            type: 'tasks/create',
            payload: payload1
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.id).toStrictEqual('111');
        expect(result.listId).toStrictEqual('222');
        expect(result.task).toStrictEqual('Mocked task for unit test');
        expect(result.isDone).toStrictEqual(false);
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).toEqual(result.updated);
    });

    test('creation is idempotent', () => {
        const prestate = reducer({}, {
            type: 'tasks/create',
            payload: payload1
        })
        const state = reducer(prestate, {
            type: 'tasks/create',
            payload: {
                id: '111',
                taskId: '222',
                task: 'Changed task'
            }
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.task).toStrictEqual('Mocked task for unit test');
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).toEqual(result.updated);
    });

    test('updates an existing task', async () => {
        const prestate = reducer({}, {
            type: 'tasks/create',
            payload: payload1
        })

        await delay(1000);      // Ensure update of timestamp

        const state = reducer(prestate, {
            type: 'tasks/update',
            payload: payload2
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.id).toStrictEqual('111');
        expect(result.listId).toStrictEqual('222');
        expect(result.task).toStrictEqual('Changed task');
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).not.toEqual(result.updated);
    });

    test('archives an existing task', async () => {
        const prestate = reducer({}, {
            type: 'tasks/create',
            payload: payload1
        })
        const state = reducer(prestate, {
            type: 'tasks/updateIsDone',
            payload: { id: '111', isDone: true }
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.isDone).toStrictEqual(true);
    });

    test('deletes an existing task', async () => {
        let state = {};

        state = reducer(state, {
            type: 'tasks/create',
            payload: payload1
        })
        state = reducer(state, {
            type: 'tasks/create',
            payload: payload3
        })
        state = reducer(state, {
            type: 'tasks/create',
            payload: payload4
        })
        state = reducer(state, {
            type: 'tasks/delete',
            payload: { id: '222' }
        })

        const result = state;

        expect(result['111']).toBeDefined();
        expect(result['222']).toBeUndefined();
        expect(result['333']).toBeDefined();
    });
});
