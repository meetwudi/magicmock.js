import test from "tape"
import {mockMethod, mockObject} from "../src"

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
