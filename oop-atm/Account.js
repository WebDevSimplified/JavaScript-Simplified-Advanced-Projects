const FileSystem = require("./FileSystem")

module.exports = class Account {
  constructor(name) {
    this.#name = name
  }

  #name
  #balance

  static async find(name) {
    const account = new Account(name)

    try {
      await account.#load()
      return account
    } catch (e) {
      return
    }
  }

  static async create(name) {
    const account = new Account(name)
    await FileSystem.write(account.filePath, 0)
    await account.#load()
    return account
  }

  get filePath() {
    return `accounts/${this.#name}.txt`
  }

  get balance() {
    return this.#balance
  }

  async #load() {
    this.#balance = parseFloat(await FileSystem.read(this.filePath))
  }

  async deposit(amount) {
    await FileSystem.write(this.filePath, this.#balance + amount)
    this.#balance = this.#balance + amount
  }

  async withdraw(amount) {
    if (this.#balance < amount) throw new Error()
    await FileSystem.write(this.filePath, this.#balance - amount)
    this.#balance = this.#balance - amount
  }
}
