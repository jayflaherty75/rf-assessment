
import EventEmitter from 'events';

const _emitter = new EventEmitter();

let _store = null;
let _dispatcher = null;

const storeErrorMsg = 'Action middleware must be initialized with a redux store';
const InvalidKeyErrorMsg = 'Invalid message key type';

export const ACTION_MIDDLEWARE_WARNING = 'app/worker-middleware-warning';
export const ACTION_MIDDLEWARE_ERROR = 'app/worker-middleware-error';

const _errorAction = error => ({ type: ACTION_MIDDLEWARE_ERROR, error });

/**
 * Initialize action middleware with the given options.
 * @param {object} options
 * @param {object} options.dispatch - Action dispatcher, `dispatch(action)`
 * @throws {Error}
 */
export const initializeWorkers = (store) => {
	if (typeof store !== 'object') {
		throw (new Error(storeErrorMsg));
	}

	_store = store;
	_dispatcher = action => _store.dispatch(action);
};

export const createSelector = (selector) => {
	return (...args) => selector(_store.getState(), ...args);
};

/**
 * Dispatches an action and resolves when the action is fired.
 * @param {object} action
 * @param {string} action.type - Action type/event key
 * @param {*} action.payload Optional - Event payload, not set if error
 * @param {Error} action.error Optional - Error instance passed on failure
 * @returns {Promise}
 * @throws {Error}
 */
export const put = (action = {}) => new Promise(
	(resolve, reject) => {
		if (typeof action.type !== 'string') {
			const err = new Error(
				`${InvalidKeyErrorMsg}: ${typeof action.type}`
			);

			_dispatcher(_errorAction(err));
			reject(err);
		} else {
			// Resolve when the action fires.
			_emitter.once(action.type, resolve);

			// Fire the action, middleware will emit and `resolve` will handle.
			_dispatcher(action);
		}
	}
);

/**
 * Promisifies an action.  If a saga is triggered by or dispatches an action,
 * it may await the result by using `take` on it's action type.
 * @param {string} key - Action type to await
 * @returns {Promise}
 * @throws {Error}
 */
export const take = key => new Promise(
	(resolve, reject) => {
		if (typeof key !== 'string') {
			const errAction = _errorAction(
				new Error(`${InvalidKeyErrorMsg}: ${typeof key}`)
			);

			_dispatcher(errAction);

			reject(errAction);

			return;
		}

		_emitter.once(key, resolve);
	}
);

/**
 * Delays the dispatch of a message by the given time in milliseconds.  Return
 * value can be used with `clearTimeout` to cancel the action.
 * @param {object} action
 * @param {integer} [ms=0]
 */
export const delay = (action, ms = 0) => setTimeout(() => put(action), ms);

/**
 * Set a saga on an action event.
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @param {boolean} prioritize - Fire before other handlers
 * @returns {function} Returns the resulting saga for further usage
 */
export const on = (key, saga, prioritize = false) => {
	prioritize
		? _emitter.on(key, saga)
		: _emitter.prependListener(key, saga);

	return saga;
};

/**
 * Removes a saga for an action event.
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @return {function} Returns the resulting saga for further usage
 */
export const off = (key, saga) => {
	_emitter.off(key, saga);

	return saga;
};

/**
 * Set a saga on an action event.  Listener will only be fired once and
 * immediately unregistered.
 * @param {string} key - Action type/event key
 * @param {function} saga - Event handler
 * @returns {function} Returns the resulting saga for further usage
 */
export const once = (key, saga) => {
	_emitter.once(key, saga);

	return saga;
};

// Redux middleware, emits actions as events.
const workersMiddleware = store => next => action => {
	const { type } = action;

	_emitter.emit(type, action);

	return next(action);
};

export default workersMiddleware;
