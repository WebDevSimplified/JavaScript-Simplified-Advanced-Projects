import parse from "./parse.js"

describe("#parse", () => {
  test("it works", () => {
    expect(parse("3 - 1")).toBe(2)
  })
})
