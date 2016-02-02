import Reflect from 'harmony-reflect';
import _ from 'lodash';

export default function mockMethod () {
}

mockMethod.create = function (options = {}) {
  let {
    returnValue,
    sideEffect
  } = options;
  let mockedMethod = function () {};
  let state = {
    returnValue,
    invocations: [],
    sideEffect
  };

  let handler = {
    apply(method, context, methodArgs) {
      // Record the invocation
      state.invocations.push(methodArgs || []);
      if (state.sideEffect) {
        return mockedMethod._causeSideEffect(methodArgs);
      }
      return state.returnValue;
    },

    set(target, propKey, value, receiver) {
      if (propKey === 'returnValue') {
        state.returnValue = value;
      }
    }
  };

  mockedMethod._causeSideEffect = (methodArgs) => {
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


