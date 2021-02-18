const readline = require("readline")

module.exports = class CommandLine {
  static print(text) {
    console.log(text)
  }

  static ask(text) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    return new Promise(resolve => {
      rl.question(`${text} `, answer => {
        resolve(answer)
        rl.close()
      })
    })
  }
}
