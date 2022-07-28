import reducer from './reducer';
import { isValidDate, delay } from 'lib/helpers';

const payload1 = {
    id: '111',
    name: 'Slim Shady'
};

const payload2 = {
    id: '111',
    name: 'Changed name'
};

const payload3 = { ...payload1, id: '222' };
const payload4 = { ...payload1, id: '333' };

describe('Topics reducer', () => {
    test('creates a valid topic', () => {
        const state = reducer({}, {
            type: 'topics/create',
            payload: payload1
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.id).toStrictEqual('111');
        expect(result.name).toStrictEqual('Slim Shady');
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).toEqual(result.updated);
    });

    test('creation is idempotent', () => {
        const prestate = reducer({}, {
            type: 'topics/create',
            payload: payload1
        })
        const state = reducer(prestate, {
            type: 'topics/create',
            payload: {
                id: '111',
                name: 'Changed name'
            }
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.name).toStrictEqual('Slim Shady');
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).toEqual(result.updated);
    });

    test('updates an existing topic', async () => {
        const prestate = reducer({}, {
            type: 'topics/create',
            payload: payload1
        })

        await delay(1000);      // Ensure update of timestamp

        const state = reducer(prestate, {
            type: 'topics/update',
            payload: payload2
        })
        const result = state['111'];

        expect(result).toBeDefined();
        expect(result.id).toStrictEqual('111');
        expect(result.name).toStrictEqual('Changed name');
        expect(isValidDate(result.created)).toEqual(true);
        expect(isValidDate(result.updated)).toEqual(true);
        expect(result.created).not.toEqual(result.updated);
    });

    test('deletes an existing topic', async () => {
        let state = {};

        state = reducer(state, {
            type: 'topics/create',
            payload: payload1
        })
        state = reducer(state, {
            type: 'topics/create',
            payload: payload3
        })
        state = reducer(state, {
            type: 'topics/create',
            payload: payload4
        })
        state = reducer(state, {
            type: 'topics/delete',
            payload: { id: '222' }
        })

        const result = state;

        expect(result['111']).toBeDefined();
        expect(result['222']).toBeUndefined();
        expect(result['333']).toBeDefined();
    });
});
