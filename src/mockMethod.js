import Reflect from 'harmony-reflect';
import _ from 'lodash';

export default function mockMethod () {
  // Do not persist any state here since every mocked method shares this target object. Instead, states reside in mockMethod._create method.
}

mockMethod._create = function (...args) {
  let mockedMethod = this;
  let returnValue = undefined;
  mockedMethod.invocations = [];

  let handler = {
    apply(method, context, methodArgs) {
      mockedMethod.invocations.push(methodArgs || []);
      return returnValue;
    },

    set(target, propKey, value, receiver) {
      if (propKey === 'returnValue') {
        returnValue = value;
      }
    }
  };
  return new Proxy(mockMethod, handler);
};

mockMethod.calledWith = function (...args) {
  for (let calledArgs of this.invocations) {
    if (_.isEqual(calledArgs, args)) {
      return true;
    }
  }
  return false;
};

mockMethod.called = function () {
  return this.invocations.length > 0;
};
