
import EventEmitter from 'events';

const WORKERS_ERROR_ACTION = 'workers/error';

const initializationErrorMsg = 'Worker middleware must be initialized with a valid dispatcher.';
const invalidKeyErrorMsg = 'Invalid or missing message key type';

let _store = null;
let _dispatch = null;
let _emitter = new EventEmitter();

const _errorAction = error => ({ type: WORKERS_ERROR_ACTION, error });

/**
 * Initialize worker middleware with the given options.
 * @param {object} options
 * @param {object} [options.store] - Redux store
 * @param {function} options.dispatch - Dispatches action
 * @param {EventEmitter} [options.emitter] - Event emitter instance
 * @throws {Error}
 */
const initialize = ({ store, dispatch, emitter }) => {
	if (typeof dispatch !== 'function') {
		throw (new Error(initializationErrorMsg));
	}

	_store = store;
	_dispatch = dispatch;
	_emitter = emitter || _emitter;
};

/**
 * Creates a new selector that wraps the given selector and does not require
 * state to be passed in.
 * 
 * USAGE:
 * 	const mySelector = createSelector((state, index) => state.items[index]);
 *  const result = mySelector(0);
 * @param {function} selector accepting state as first argument and returning
 * 	a value
 * @returns {function}
 * @throws {TypeError} if `store` is not set during initialization
 */
const createSelector = (selector) => {
	return (...args) => selector(_store.getState(), ...args);
};

/**
 * Dispatches an action and resolves when the action is fired.
 * 
 * USAGE:
 * 	await put({ type: 'MY_ACTION', payload: 'Hello World!' });
 * @param {object} action
 * @param {string} action.type - Action type/event key
 * @param {*} action.payload Optional - Event payload, not set if error
 * @param {Error} action.error Optional - Error instance passed on failure
 * @returns {Promise}
 * @throws {Error}
 */
const put = (action = {}) => new Promise(
	(resolve, reject) => {
		if (typeof action.type !== 'string') {
			const err = new Error(
				`${invalidKeyErrorMsg}: ${typeof action.type}`
			);

			_dispatch(_errorAction(err));
			reject(err);
		} else {
			// Resolve when the action fires.
			_emitter.once(action.type, resolve);

			// Fire the action, middleware will emit and `resolve` will handle.
			_dispatch(action);
		}
	}
);

/**
 * Promisifies an action.  If a saga is triggered by or dispatches an action,
 * it may await the result by using `take` on it's action type.
 * 
 * USAGE:
 *  const result = await take('MY_ACTION');
 * @param {string} key - Action type to await
 * @returns {Promise}
 * @throws {Error}
 */
const take = key => new Promise(
	(resolve, reject) => {
		if (typeof key !== 'string') {
			const errAction = _errorAction(
				new Error(`${invalidKeyErrorMsg}: ${typeof key}`)
			);

			_dispatch(errAction);

			reject(errAction);

			return;
		}

		_emitter.once(key, resolve);
	}
);

/**
 * Delays the dispatch of a message by the given time in milliseconds.  Return
 * value can be used with `clearTimeout` to cancel the action.
 * 
 * USAGE:
 * 	const handle = await delay({ type: 'MY_ACTION', payload: 'Hello World!' }, 2000);
 * @param {object} action
 * @param {integer} [ms=0]
 */
const delay = (action, ms = 0) => setTimeout(() => put(action), ms);

/**
 * Set a worker to handle an action event.
 * 
 * USAGE:
 *  workers.on('MY_ACTION', myAsyncHandler);
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @returns {EventEmitter}
 */
const on = _emitter.on.bind(_emitter);

/**
 * Set a one-time worker on an action event.  Listener will only be fired once and
 * immediately unregistered.
 * 
 * USAGE:
 *  workers.once('MY_ACTION', myAsyncHandler);
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @returns {EventEmitter}
 */
const once = _emitter.once.bind(_emitter);;

/**
 * Prioritize a worker to handle an action event.  Worker will be
 * called before any other workers.
 * 
 * USAGE:
 *  workers.prependListener('MY_ACTION', myAsyncHandler);
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @returns {EventEmitter}
 */
 const prependListener = _emitter.prependListener.bind(_emitter);

/**
 * Prioritize a one-time worker to handle an action event.  Worker will be
 * called before any other workers.
 * 
 * USAGE:
 *  workers.prependOnceListener('MY_ACTION', myAsyncHandler);
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @returns {EventEmitter}
 */
  const prependOnceListener = _emitter.prependOnceListener.bind(_emitter);

/**
 * Removes a saga for an action event.
 * 
 * USAGE:
 *  workers.off('MY_ACTION', myAsyncHandler);
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @return {EventEmitter}
 */
const off = _emitter.off.bind(_emitter);;

/**
 * Emits an action as an event.  Provides direct usage of the workers
 * library without the Redux middleware.
 * 
 * USAGE:
 *  workers.emit('MY_ACTION', { type: 'MY_ACTION', payload: 'Hello World!' });
 * @param {string} key - Action type/event key
 * @param {object} action - Action to emit
 * @returns {EventEmitter}
 */
const emit = _emitter.emit.bind(_emitter);

/**
 * Redux middleware, emits actions as events to be handled by workers.
 * @param {object} store - Redux store
 * @returns {function}
 */
const reduxMiddleware = store => next => action => {
	const { type } = action;

	_emitter.emit(type, action);

	return next(action);
};

export {
	initialize,
	createSelector,
	put,
	take,
	delay,
	on,
	once,
	prependListener,
	prependOnceListener,
	off,
	emit,
	reduxMiddleware,
	WORKERS_ERROR_ACTION,
};
