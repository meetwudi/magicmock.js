import Reflect from 'harmony-reflect';
import _ from 'lodash';

export default function mockMethod () {
}

const ASYNC_CALLBACK = 'callback';
const ASYNC_PROMISE = 'promise';

mockMethod.create = function (options = {}) {
  let {
    async,
    returnValue,
    sideEffect
  } = options;
  let mockedMethod = function () {};
  let state = {
    async,
    invocations: [],
    returnValue,
    sideEffect
  };

  let handler = {
    apply(method, context, methodArgs) {
      // Record the invocation
      state.invocations.push(methodArgs || []);
      if (state.sideEffect) {
        return mockedMethod._causeSideEffect(method, context, methodArgs);
      }
      if (state.async) {
        // mocking an async execution
        return mockedMethod._runAsync(method, context, methodArgs);
      }
      return state.returnValue;
    },

    set(target, propKey, value, receiver) {
      if (propKey === 'returnValue') {
        state.returnValue = value;
      }
    }
  };

  mockedMethod._causeSideEffect = (method, context, methodArgs) => {
    if (state.sideEffect instanceof Error) {
      throw state.sideEffect;
    }
    else if (typeof state.sideEffect === 'function') {
      return state.sideEffect.apply(undefined, methodArgs);
    }
    else if (_.isArray(state.sideEffect) && state.sideEffect.length > 0) {
      return state.sideEffect.shift();
    }
    else {
      return undefined;
    }
  };

  mockedMethod._runAsync = (method, context, methodArgs) => {
    switch (state.async) {
      case ASYNC_CALLBACK:
        let callbackFn = _.last(methodArgs);
        if (typeof callbackFn !== 'function') {
          throw new Error('In callback mode, mocked method requires the last argument to be a function');
        }
        setTimeout(() => {
          callbackFn.apply(context);
        }, 0);
        return state.returnValue;
      case ASYNC_PROMISE:
        return Promise.resolve();
      default:
        throw new Error('Not supported async execution model.');
    }
  };

  mockedMethod.calledWith = (...args) => {
    for (let calledArgs of state.invocations) {
      if (_.isEqual(calledArgs, args)) {
        return true;
      }
    }
    return false;
  };

  mockedMethod.called = () => {
    return state.invocations.length > 0;
  };

  mockedMethod.callCount = () => {
    return state.invocations.length;
  };

  mockedMethod.getInvocationHistory = () => {
    return state.invocations;
  };

  return new Proxy(mockedMethod, handler);
};


