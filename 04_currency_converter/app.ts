// #!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
// import fs from 'fs';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// const response = fs.readFileSync('./data.json', 'utf8');
// let data = JSON.parse(response)


console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<====================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=======>>>  ${chalk.redBright.bold('CURRENCY CONVERTER')}  <<<=======>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<====================================>>>\n`));

interface IData {
    "Australian Dollar (AUD)": number,
    "British Pound Sterling (GBP)": number,
    "Canadian Dollar (CAD)": number,
    "Chinese Yuan Renminbi (CNY)": number,
    "Emirati Dirham (AED)": number,
    "Indian Rupee (INR)": number,
    "Pakistani Rupee (PKR)": number,
    "Qatari Riyal (QAR)": number,
    "Saudi Riyal (SAR)": number,
    "Sri Lankan Rupee (LKR)": number,
    "United States Dollar (USD)": number
}
const data: IData = require('./data.json')


type ObjectKey = keyof IData;
let selected: ObjectKey | undefined;


let sleep = () => new Promise((r) => setTimeout(r, 2000))

async function currencyInput(c: string, data: IData) {
    const input = await inquirer.prompt([{
        name: chalk.rgb(249, 140, 255)(`${c} Currency`),
        type: 'list',
        choices: Object.keys(data).filter((val) => val !== selected)
    }])
    let value: ObjectKey = await input[`\x1B[38;2;249;140;255m${c} Currency\x1B[39m`]
    selected = value
    return value
}


async function AmountInput() {
    let value: number
    while (true) {
        const input = await inquirer.prompt([{
            name: chalk.rgb(249, 140, 255)("Enter Amount"),
            type: 'number',
        }])
        value = await input['\x1B[38;2;249;140;255mEnter Amount\x1B[39m']
        if (value) {
            break
        }
    }
    return value
}

function convertCurrency(from: ObjectKey, to: ObjectKey, amount: number, data: IData) {
    selected = undefined
    return ((data[to] / data[from]) * amount).toFixed(3)
}



// Program Entry Point


while (true) {
    let amount = await AmountInput()
    let from_currency = await currencyInput('From', data)
    let to_currency = await currencyInput('TO', data)
    let converted_amount = convertCurrency(from_currency, to_currency, amount, data)

    //Spinner
    const spinner = createSpinner('Converting').start()
    await sleep()
    spinner.success({ text: "Converted successfully" })

    console.log(chalk.bgBlackBright.whiteBright.bold(`${amount} ${from_currency} = ${converted_amount} ${to_currency}`))

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
    console.log(chalk.whiteBright('\n================================================================\n'))

}