import reducer from './reducer';

describe('App reducer', () => {
    test('sets the current topic ID', () => {
        const state = reducer({}, {
            type: 'app/setTopic',
            payload: { id: '111' }
        })
        const result = state.topicId;

        expect(result).toBeDefined();
        expect(result).toStrictEqual('111');
    });

    test('sets the current list ID', () => {
        const state = reducer({}, {
            type: 'app/setList',
            payload: { id: '111' }
        })
        const result = state.listId;

        expect(result).toBeDefined();
        expect(result).toStrictEqual('111');
    });
});
