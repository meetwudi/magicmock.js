import test from "tape"
import magicmock from "../src"

test("magicmock", (t) => {
  t.plan(1)
  t.equal(true, magicmock(), "return true")
})
