import { Customer } from "./classes/customer.js";
import chalk from 'chalk';
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

const sleep = () => new Promise((r) => setTimeout(r, 2000))


export function DisplayInfo(customer: Customer) {
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Name            : `)} ${customer.name}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Age             : `)} ${customer.age}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Contact Number  : `)} ${customer.contactNumber}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`UserID          : `)} ${customer.userId}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Account Balance : `)} RS: ${customer.bankAccount.accountBalance}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Account Number  : `)} ${customer.bankAccount.accountNumber}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
}


export function ShowAccountBalance(customer: Customer) {
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(1, 59, 52)(`Account Balance : `)} RS: ${customer.bankAccount.accountBalance}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
}

export async function Credit(customer: Customer) {
    while (true) {
        const { amount } = await inquirer.prompt([{
            name: 'amount',
            message: 'Enter Amount : ',
            type: 'number'
        }])
        let spinner = createSpinner('Processing').start()
        await sleep()
        if (!amount) {
            spinner.error({ text: chalk.whiteBright.bgRedBright(` Enter Correct Amount`) })
            continue
        }
        customer.bankAccount.Credit(amount)
        spinner.success({ text: chalk.whiteBright.bgRgb(0, 125, 17)(`${amount > 100 ? 'Transaction Sccessful' : 'Transaction Sccessful And RS:1 Minus'} `) })
        return
    }
}

export async function Debit(customer: Customer) {
    while (true) {
        const { amount } = await inquirer.prompt([{
            name: 'amount',
            message: 'Enter Amount : ',
            type: 'number'
        }])
        let spinner = createSpinner('Processing').start()
        await sleep()
        if (!amount) {
            spinner.error({ text: chalk.whiteBright.bgRedBright(` Enter Correct Amount`) })
            continue
        }
        if (amount > customer.bankAccount.accountBalance) {
            spinner.error({ text: chalk.whiteBright.bgRedBright(` Amount is Greater than Your Balance`) })
            return
        }
        customer.bankAccount.Debit(amount)
        spinner.success({ text: chalk.whiteBright.bgRgb(0, 125, 17)(`Transaction Sccessful`) })
        return
    }
}



export function TransactionHistory(customer: Customer) {
    if (!customer.bankAccount.transactionHistory.length) {
        console.log(` No Transaction Available`)
        return
    }
    console.table(customer.bankAccount.transactionHistory.map((val) => { return { ...val, fee: `RS: ${val.fee}`,amount:`RS: ${val.amount}` } }))
}