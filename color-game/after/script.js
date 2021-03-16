import Rgb from "./Rgb.js"
import Hex from "./Hex.js"
import Hsl from "./Hsl.js"

const COLOR_MAP = {
  rgb: Rgb,
  hex: Hex,
  hsl: Hsl,
}

const DIFFICULTY_MAP = {
  easy: { outsideTolerance: 0.2, withinTolerance: 1 },
  medium: { outsideTolerance: 0.2, withinTolerance: 0.5 },
  hard: { outsideTolerance: 0.2, withinTolerance: 0.3 },
}

const colorGrid = document.querySelector("[data-color-grid]")
const colorStringElement = document.querySelector("[data-color-string]")
const resultsElement = document.querySelector("[data-results]")
const resultsTextElement = document.querySelector("[data-results-text]")
const nextButtonElement = document.querySelector("[data-next-btn]")

nextButtonElement.addEventListener("click", render)
document.addEventListener("change", e => {
  if (e.target.matches('input[type="radio"]')) {
    render()
  }
})
render()

function render() {
  const format = document.querySelector('[name="format"]:checked').value
  const difficulty = document.querySelector('[name="difficulty"]:checked').value
  const { colors, colorString } = generateColors({
    format,
    difficulty,
  })

  colorStringElement.textContent = colorString
  colorGrid.innerHTML = ""
  resultsElement.classList.add("hide")
  const colorElements = colors
    .sort(() => Math.random() - 0.5)
    .map(color => {
      const element = document.createElement("button")
      element.style.backgroundColor = color.toCss()
      console.log(color.toCss())
      return { element, color }
    })

  colorElements.forEach(({ color, element }) => {
    element.addEventListener("click", () => {
      resultsElement.classList.remove("hide")
      resultsTextElement.textContent =
        color.toCss() === colorString ? "Correct" : "Wrong"
      colorElements.forEach(({ color: c, element: e }) => {
        e.disabled = true
        e.classList.toggle("wrong", c.toCss() !== colorString)
      })
    })
    colorGrid.append(element)
  })
}

function generateColors({ format, difficulty }) {
  const colorClass = COLOR_MAP[format]
  const difficultyRules = DIFFICULTY_MAP[difficulty]
  const correctColor = colorClass.generate()
  const colors = [correctColor]

  for (let i = 0; i < 5; i++) {
    colors.push(correctColor.generateSimilar(difficultyRules))
  }

  return { colors, colorString: correctColor.toCss() }
}
