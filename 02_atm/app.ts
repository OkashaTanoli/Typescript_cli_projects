#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner, Spinner } from 'nanospinner';


console.log(chalk.bold.rgb(204, 204, 204)('ATM MACHINE'));
let ID = 12345
let PIN = 4321
let totalAmount = 1000


let sleep = () => new Promise((r) => setTimeout(r, 1000))

async function Login() {
    enum InputOptions {
        ID = 'id',
        PIN = 'pin'
    }
    const Input = async (option: InputOptions): Promise<number> => {
        const input = await inquirer.prompt([{
            name: chalk.rgb(255, 148, 140)(`Enter Your ${option}`),
            type: 'number',
        }])
        let value: number = await input[`\x1B[38;2;255;148;140mEnter Your ${option}\x1B[39m`]
        return value
    }
    let USER_ID = await Input(InputOptions.ID)
    let USER_PIN = await Input(InputOptions.PIN)
    const spinner: Spinner = createSpinner('Authenticating').start()
    await sleep()
    if (USER_ID === ID && USER_PIN === PIN) {
        spinner.success({ text: chalk.green("Authentication Successfull") })
        return true
    }
    else {
        spinner.error({ text: chalk.red("Authentication Failed") })
        return false
    }

}

async function AmountInput() {
    const input = await inquirer.prompt([{
        name: 'Enter Amount',
        type: 'number',
    }])
    const value: number = await input['Enter Amount']
    return value
}

async function WithDraw() {
    while (true) {
        const amount = await AmountInput()
        const spinner: Spinner = createSpinner('Withdrawing').start()
        await sleep()
        if (amount <= totalAmount) {
            totalAmount -= amount
            spinner.success({ text: chalk.green(`Successful WithDrawl of ${amount}`) })
            break
        }
        else {
            spinner.error({ text: chalk.red(`Your amount is less than ${amount}`) })
        }
    }
}

async function Deposit() {
    const amount = await AmountInput()
    const spinner: Spinner = createSpinner('Depositing').start()
    await sleep()
    totalAmount += amount
    spinner.success({ text: chalk.green(`Successfully Deposit RS: ${amount}`) })
}


async function AtmFunctions() {
    const input = await inquirer.prompt([{
        name: 'Select Option',
        type: 'list',
        choices: ['Withdraw Amount', 'Deposit Amount', 'Available Amount']
    }])
    let value: string = await input['Select Option']
    if (value === 'Withdraw Amount') {
        await WithDraw()
    }
    if (value === 'Deposit Amount') {
        await Deposit()
    }
    if (value === 'Available Amount') {
        console.log(chalk.bgBlackBright.white(`Total Amount: ${totalAmount}`))
    }
}




// Program Entry Point

let isLogin = await Login()
while (true) {
    while (true) {
        if (isLogin) {
            await AtmFunctions()
            break
        } else {
            isLogin = await Login()
        }
    }

    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)(`Do You Want To Exit?`),
            type: "confirm",
        }
    ])
    let value: boolean = await input['\x1B[38;2;255;255;160mDo You Want To Exit?\x1B[39m']
    if (value) {
        break;
    }
}
