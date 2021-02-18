export default class Calculator {
  #primaryOperandDisplay
  #secondaryOperandDisplay
  #operationDisplay

  constructor(
    primaryOperandDisplay,
    secondaryOperandDisplay,
    operationDisplay
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay
    this.#secondaryOperandDisplay = secondaryOperandDisplay
    this.#operationDisplay = operationDisplay

    this.clear()
  }

  addDigit(digit) {
    if (
      digit === "." &&
      this.#primaryOperandDisplay.dataset.value.includes(".")
    ) {
      return
    }
    if (this.primaryOperand === 0) {
      this.#primaryOperand = digit
      return
    }
    this.#primaryOperand = this.#primaryOperandDisplay.dataset.value + digit
  }

  removeDigit() {
    const numberString = this.#primaryOperandDisplay.dataset.value
    if (numberString.length <= 1) {
      this.#primaryOperand = 0
      return
    }
    this.#primaryOperand = numberString.substring(0, numberString.length - 1)
  }

  chooseOperation(operation) {
    this.#operation = operation
    this.#secondaryOperand = this.primaryOperand
    this.#primaryOperand = 0
  }

  evaluate() {
    let result
    switch (this.operation) {
      case "+":
        result = this.secondaryOperand + this.primaryOperand
        break
      case "-":
        result = this.secondaryOperand - this.primaryOperand
        break
      case "*":
        result = this.secondaryOperand * this.primaryOperand
        break
      case "÷":
        result = this.secondaryOperand / this.primaryOperand
        break
      default:
        return
    }

    this.clear()
    this.#primaryOperand = result

    return result
  }

  clear() {
    this.#primaryOperand = 0
    this.#secondaryOperand = null
    this.#operation = null
  }

  get primaryOperand() {
    return parseFloat(this.#primaryOperandDisplay.dataset.value)
  }

  set #primaryOperand(value) {
    this.#primaryOperandDisplay.dataset.value = value
    this.#primaryOperandDisplay.textContent = displayNumber(value)
  }

  get secondaryOperand() {
    return parseFloat(this.#secondaryOperandDisplay.dataset.value)
  }

  set #secondaryOperand(value) {
    this.#secondaryOperandDisplay.dataset.value = value
    this.#secondaryOperandDisplay.textContent = displayNumber(value)
  }

  get operation() {
    return this.#operationDisplay.textContent
  }

  set #operation(value) {
    this.#operationDisplay.textContent = value ?? ""
  }
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en", {
  maximumFractionDigits: 20,
})

function displayNumber(value) {
  value = value?.toString() ?? ""
  if (value === "") return ""

  const [integer, decimal] = value.split(".")
  const formattedInteger = NUMBER_FORMATTER.format(integer)
  if (decimal == null) {
    return formattedInteger
  }
  return formattedInteger + "." + decimal
}
