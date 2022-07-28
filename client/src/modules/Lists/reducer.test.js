import reducer from './reducer';
import { isValidDate, delay } from 'lib/helpers';

const payload1 = {
    id: '111',
    topicId: '222',
    title: 'Mocked value for unit test'
};

const payload2 = {
    id: '111',
    title: 'Changed title'
};

const payload3 = { ...payload1, id: '222' };
const payload4 = { ...payload1, id: '333' };

describe('List reducer', () => {
    test('creates a valid list', () => {
        const state = reducer({}, {
            type: 'lists/create',
            payload: payload1
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.id).toStrictEqual('111');
        expect(result.topicId).toStrictEqual('222');
        expect(result.title).toStrictEqual('Mocked value for unit test');
        expect(result.isArchived).toStrictEqual(false);
        expect(Array.isArray(result.keys)).toEqual(true);
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).toEqual(result.updated);
    });

    test('creation is idempotent', () => {
        const prestate = reducer({}, {
            type: 'lists/create',
            payload: payload1
        })
        const state = reducer(prestate, {
            type: 'lists/create',
            payload: {
                id: '111',
                topicId: '222',
                title: 'Changed title'
            }
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.title).toStrictEqual('Mocked value for unit test');
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).toEqual(result.updated);
    });

    test('updates an existing list', async () => {
        const prestate = reducer({}, {
            type: 'lists/create',
            payload: payload1
        })

        await delay(1000);      // Ensure update of timestamp

        const state = reducer(prestate, {
            type: 'lists/update',
            payload: payload2
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.id).toStrictEqual('111');
        expect(result.topicId).toStrictEqual('222');
        expect(result.title).toStrictEqual('Changed title');
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).not.toEqual(result.updated);
    });

    test('archives an existing list', async () => {
        const prestate = reducer({}, {
            type: 'lists/create',
            payload: payload1
        })
        const state = reducer(prestate, {
            type: 'lists/archive',
            payload: { id: '111' }
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.isArchived).toStrictEqual(true);
    });

    test('deletes an existing list', async () => {
        let state = {};

        state = reducer(state, {
            type: 'lists/create',
            payload: payload1
        })
        state = reducer(state, {
            type: 'lists/create',
            payload: payload3
        })
        state = reducer(state, {
            type: 'lists/create',
            payload: payload4
        })
        state = reducer(state, {
            type: 'lists/delete',
            payload: { id: '222' }
        })

        expect(state['111']).toBeDefined();
        expect(state['222']).toBeUndefined();
        expect(state['333']).toBeDefined();
    });
});
