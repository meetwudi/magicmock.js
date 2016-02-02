import Reflect from 'harmony-reflect';
import mockMethod from './mockMethod';

export default class MockObject {
  static create(options = {}) {
    let {
      props = {}
    } = options;

    let handler = {
      get(target, propKey, receiver) {
        let value = Reflect.get(target, propKey, receiver);
        if (!value) {
          value = mockMethod.create();
          Reflect.set(target, propKey, value, receiver);
        }
        return value;
      }
    };
    let result = new MockObject();
    Object.assign(result, props);
    return new Proxy(result, handler);
  }
}
