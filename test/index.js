import test from "tape";
import {mockMethod, mockObject} from "../src";
import _ from 'lodash';

test("mockMethod", (t) => {
  t.test('called', (st) => {
    let method = mockMethod();
    st.equal(method.called(), false);
    method();
    st.equal(method.called(), true);
    st.end();
  });

  t.test('calledWith - empty arguments', (st) => {
    let method = mockMethod();
    st.equal(method.calledWith(), false);
    method();
    st.equal(method.calledWith(), true);
    st.end();
  });

  t.test('calledWith - with arguments', (st) => {
    let method = mockMethod();
    st.equal(method.calledWith(1, 2), false);
    method(1, 2);
    st.equal(method.calledWith(1, 2), true);
    st.equal(method.calledWith(2, 1), false);
    st.end();
  });

  t.test('calledWith - with arguments (complex)', (st) => {
    let method = mockMethod();
    st.equal(method.calledWith(1, { b: 3 }), false);
    method(1, { b : 3 });
    st.equal(method.calledWith(1, { b: 3 }), true);
    st.end();
  });

  t.test('callCount - should return counts called', (st) => {
    let method = mockMethod();
    method();
    method(1);
    method(1, 2);
    st.equal(method.callCount(), 3);
    st.end();
  });

  t.test('returnValue - without arguments', (st) => {
    let method = mockMethod();
    st.equal(method(), undefined);
    method.returnValue = 100;
    st.equal(method(), 100);
    st.end();
  });

  t.test('returnValue - with arguments', (st) => {
    let method = mockMethod();
    st.equal(method(1, 2), undefined);
    method.returnValue = 101;
    st.equal(method(1, 2), 101);
    st.end();
  });

  t.test('returnValue - as option', (st) => {
    let method = mockMethod({
      returnValue: 102
    });
    st.equal(method(), 102);
    st.equal(method(1, 2), 102);
    st.end();
  });

  t.test('sideEffect - should throw an error', (st) => {
    let method = mockMethod({
      sideEffect: new Error('My GOSH!')
    });
    t.throws(method);
    t.end();
  });

  t.test('sideEffect - handle function', (st) => {
    let resultMap = {'a': 1, 'b': 2, 'c': 3}
    let method = mockMethod({
      sideEffect: (key) => resultMap[key]
    });
    st.equal(method('a'), 1);
    st.equal(method('b'), 2);
    st.equal(method('c'), 3);
    st.equal(method('c'), 3);
    st.equal(method('d'), undefined);
    st.end();
  });

  t.test('sideEffect - handle array', (st) => {
    let sideEffects = [100, 102, 104];
    let method = mockMethod({
      sideEffect: sideEffects
    });
    st.equal(method(), 100);
    st.equal(method(101, 'a'), 102);
    st.equal(method(), 104);
    st.equal(method({ yo: 'man' }), undefined);
    st.end();
  });

  t.test('getInvocationHistory - should return array of invocation history', (st) => {
    let method = mockMethod();
    method();
    method(1);
    method({a: 1});
    st.ok(_.isEqual(method.getInvocationHistory(), [[], [1], [{a: 1}]]));
    st.end();
  });

  t.test('async - should execute callback function', (st) => {
    st.plan(1);
    let method = mockMethod({
      async: 'callback'
    });
    let callbackCalled = false;
    method(1, 2, function () {
      callbackCalled = true;
      st.end();
    });
    st.equal(callbackCalled, false);
  });

  t.test('async - should return a promise', (st) => {
    let method = mockMethod({
      async: 'promise'
    });
    st.plan(1);
    method().then(() => {
      st.pass();
      st.end();
    });
  });
});


test('mockObject', (t) => {
  t.test('should return mockedMethod for undefined properties', (st) => {
    let mockedObject = mockObject();
    mockedObject.testMethod.returnValue = 101;
    st.equal(mockedObject.testMethod(), 101);
    mockedObject.testMethod = 1; // should still assign correctly
    st.equal(mockedObject.testMethod, 1);
    st.end();
  });

  t.test('should not return mockedMethod for defined properties through options', (st) => {
    let mockedObject = mockObject({
      props: {
        testMethod: 4
      }
    });
    st.equal(mockedObject.testMethod, 4);
    st.end();
  });
});
