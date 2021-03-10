import parse from "./parse.js"

describe("#parse", () => {
  describe("with exponents", () => {
    test("it returns the correct result", () => {
      expect(parse("3 ^ 2")).toBe(9)
    })
  })

  describe("with addition", () => {
    test("it returns the correct result", () => {
      expect(parse("3 + 2")).toBe(5)
    })
  })

  describe("with subtraction", () => {
    test("it returns the correct result", () => {
      expect(parse("2 - 3")).toBe(-1)
    })
  })

  describe("with multiplication", () => {
    test("it returns the correct result", () => {
      expect(parse("2 * 3")).toBe(6)
    })
  })

  describe("with division", () => {
    test("it returns the correct result", () => {
      expect(parse("3 / 2")).toBe(1.5)
    })
  })

  describe("with parenthesis", () => {
    test("it returns the correct result", () => {
      expect(parse("2 * (3 + 2)")).toBe(10)
    })
  })

  describe("with very large numbers", () => {
    test("it returns the correct result in scientific notation", () => {
      expect(parse("10 ^ 30")).toBe(1e30)
    })
  })

  describe("with very small numbers", () => {
    test("it returns the correct result in scientific notation", () => {
      expect(parse("10 ^ -30")).toBe(1e-30)
    })
  })

  describe("with complex order of operations", () => {
    test("it returns the correct result", () => {
      expect(parse("((4 + 3) * 7) - 4 ^ 2")).toBe(33)
    })
  })

  describe("with a malformed equation", () => {
    test("it returns NaN", () => {
      expect(parse("abc")).toBeNaN()
    })
  })
})
