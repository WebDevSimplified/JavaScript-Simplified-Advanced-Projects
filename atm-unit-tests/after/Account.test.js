const Account = require("./Account")
const FileSystem = require("./FileSystem")

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("#deposit", () => {
  test("it adds money to the account", async () => {
    const amount = 10
    const startingBalance = 5
    const account = await createAccount("Kyle", startingBalance)
    const spy = jest
      .spyOn(FileSystem, "write")
      .mockReturnValue(Promise.resolve())
    await account.deposit(amount)
    expect(account.balance).toBe(amount + startingBalance)
    expect(spy).toHaveBeenCalledWith(account.filePath, amount + startingBalance)
  })
})

describe("#withdraw", () => {
  test("it removes money from the account", async () => {
    const amount = 5
    const startingBalance = 15
    const account = await createAccount("Kyle", startingBalance)
    const spy = jest
      .spyOn(FileSystem, "write")
      .mockReturnValue(Promise.resolve())
    await account.withdraw(amount)
    expect(account.balance).toBe(startingBalance - amount)
    expect(spy).toHaveBeenCalledWith(account.filePath, startingBalance - amount)
  })

  describe("with an insufficient balance", () => {
    test("it throws an error", async () => {
      const amount = 15
      const startingBalance = 5
      const account = await createAccount("Kyle", startingBalance)
      const spy = jest.spyOn(FileSystem, "write")
      await expect(account.withdraw(amount)).rejects.toThrow()
      expect(account.balance).toBe(startingBalance)
      expect(spy).not.toHaveBeenCalled()
    })
  })
})

async function createAccount(name, balance) {
  const spy = jest
    .spyOn(FileSystem, "read")
    .mockReturnValueOnce(Promise.resolve(balance))
  const account = await Account.find(name)
  spy.mockRestore()
  return account
}
