const inputElement = document.getElementById("equation")
const outputElement = document.getElementById("results")
const form = document.getElementById("equation-form")
// Gets the content inside the first inner most parenthesis
// Input: 2 * (3 - 4) ^ 5
// Matches: 3 - 4
const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/
// Grabs the first exponent operation
// Input: 2 + 3 ^ 4 - 5
// Matches: 3 ^ 4
const EXPONENT_REGEX = /(?<operand1>\S+)\s*(?<operation>\^)\s*(?<operand2>\S+)/
// Grabs the first multiply or divide operation
// Input: 2 + 3 * 4 - 5
// Matches: 3 * 4
const MULTIPLY_DIVIDE_REGEX = /(?<operand1>\S+)\s*(?<operation>[\*\/])\s*(?<operand2>\S+)/
// Grabs the first add or subtract operation
// Input: 2 + 3 * 4 - 5
// Matches: 2 + 3
const ADD_SUBTRACT_REGEX = /(?<operand1>\S+)\s*(?<operation>(?<!e)[\+\-])\s*(?<operand2>\S+)/

form.addEventListener("submit", e => {
  e.preventDefault()

  outputElement.innerText = parse(inputElement.value.trim())
})

// Make sure to test really large/small numbers to deal with +e/-e
// Make sure to test negative numbers
// Make sure to test floating point numbers
function parse(equation) {
  if (equation.match(PARENTHESIS_REGEX)) {
    const subEquation = equation.match(PARENTHESIS_REGEX).groups.equation
    const newEquation = equation.replace(PARENTHESIS_REGEX, parse(subEquation))
    return parse(newEquation)
  } else if (equation.match(EXPONENT_REGEX)) {
    const result = handleMath(equation.match(EXPONENT_REGEX).groups)
    const newEquation = equation.replace(EXPONENT_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups)
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(ADD_SUBTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
    return parse(newEquation)
  } else {
    return parseFloat(equation)
  }
}

function handleMath({ operand1, operand2, operation }) {
  const number1 = parseFloat(operand1)
  const number2 = parseFloat(operand2)

  switch (operation) {
    case "*":
      return number1 * number2
    case "/":
      return number1 / number2
    case "+":
      return number1 + number2
    case "-":
      return number1 - number2
    case "^":
      return number1 ** number2
  }
}
