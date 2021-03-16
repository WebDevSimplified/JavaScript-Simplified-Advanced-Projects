import Rgb from "./Rgb.js"

const HEX_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

export default class Hex extends Rgb {
  toCss() {
    const rHex = decimalToHex(this.r)
    const gHex = decimalToHex(this.g)
    const bHex = decimalToHex(this.b)
    return `#${rHex}${gHex}${bHex}`
  }
}

function decimalToHex(decimal) {
  const firstDigit = HEX_VALUES[Math.floor(decimal / 16)]
  const secondDigit = HEX_VALUES[Math.floor(decimal % 16)]
  return `${firstDigit}${secondDigit}`
}
