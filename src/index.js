import _mockMethod from './mockMethod';
import _mockObject from './mockObject';

export function mockMethod(...args) {
  return _mockMethod._create(...args);
}

export function mockObject({}) {
  throw new Error('Not implemented');
}
