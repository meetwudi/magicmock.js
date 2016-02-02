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
        throw state.sideEffect;
      }
      return state.returnValue;
    },

    set(target, propKey, value, receiver) {
      if (propKey === 'returnValue') {
        state.returnValue = value;
      }
    }
  };

  mockedMethod.causeSideEffect = function (sideEffect) {

  };

  mockedMethod.calledWith = function (...args) {
    for (let calledArgs of state.invocations) {
      if (_.isEqual(calledArgs, args)) {
        return true;
      }
    }
    return false;
  };

  mockedMethod.called = function () {
    return state.invocations.length > 0;
  };

  return new Proxy(mockedMethod, handler);
};


