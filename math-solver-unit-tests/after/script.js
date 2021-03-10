import parse from "./parse.js"

const inputElement = document.getElementById("equation")
const outputElement = document.getElementById("results")
const form = document.getElementById("equation-form")

form.addEventListener("submit", e => {
  e.preventDefault()

  const result = parse(inputElement.value)
  outputElement.textContent = result
})
