import parse from "./parse.js"

test("it works", () => {
  expect(parse("3 - 2")).toBe(1)
})
