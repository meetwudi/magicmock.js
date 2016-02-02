import test from "tape"
import {mockMethod} from "../src"

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
});
