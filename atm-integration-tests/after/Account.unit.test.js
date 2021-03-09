const FileSystem = require("./FileSystem")
const Account = require("./Account")

beforeEach(() => {
  jest.restoreAllMocks()
})

describe("#deposit", () => {
  test("it adds money to the account", async () => {
    const startingBalance = 5
    const amount = 10
    const account = await createAccount("Kyle", startingBalance)
    const spy = jest
      .spyOn(FileSystem, "write")
      .mockReturnValue(Promise.resolve())

    await account.deposit(amount)
    expect(account.balance).toBe(amount + startingBalance)
    expect(spy).toBeCalledWith(account.filePath, amount + startingBalance)
  })
})

describe("#withdraw", () => {
  test("it removes money from the account", async () => {
    const startingBalance = 10
    const amount = 5
    const account = await createAccount("Kyle", startingBalance)
    const spy = jest
      .spyOn(FileSystem, "write")
      .mockReturnValue(Promise.resolve())

    await account.withdraw(amount)
    expect(account.balance).toBe(startingBalance - amount)
    expect(spy).toBeCalledWith(account.filePath, startingBalance - amount)
  })

  describe("with not enough money in the account", () => {
    test("it should throw an error", async () => {
      const startingBalance = 5
      const amount = 10
      const account = await createAccount("Kyle", startingBalance)
      const spy = jest.spyOn(FileSystem, "write")

      await expect(account.withdraw(amount)).rejects.toThrow()
      expect(account.balance).toBe(startingBalance)
      expect(spy).not.toBeCalled()
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
