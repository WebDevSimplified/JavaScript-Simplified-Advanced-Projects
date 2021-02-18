const CommandLine = require("./CommandLine.js")
const Account = require("./Account.js")

async function main() {
  try {
    const accountName = await CommandLine.ask(
      "Which account would you like to access?"
    )
    let account = await Account.find(accountName)
    if (account == null) account = await promptCreateAccount(accountName)
    if (account != null) await promptTask(account)
  } catch (e) {
    CommandLine.print("ERROR: Try again")
  }
}

async function promptCreateAccount(name) {
  const response = await CommandLine.ask(
    "That account does not exist? Would you like to create it? (yes/no)"
  )
  if (response === "yes") {
    return await Account.create(name)
  }
}

async function promptTask(account) {
  const task = await CommandLine.ask(
    "What would you like to do? (view/deposit/withdraw)"
  )

  if (task === "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much?"))
    await account.deposit(amount)
  } else if (task === "withdraw") {
    const amount = parseFloat(await CommandLine.ask("How much?"))
    try {
      await account.withdraw(amount)
    } catch (e) {
      CommandLine.print(
        "We were unable to withdraw that amount. Make sure your balance is high enough."
      )
    }
  }

  CommandLine.print(`Your balance is ${account.balance}`)
}

main()
