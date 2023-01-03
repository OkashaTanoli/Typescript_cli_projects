#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
console.log(chalk.rgb(204, 204, 204)('CLI CALCULATOR'));
let sleep = () => new Promise((r) => setTimeout(r, 2000));
async function FirstNunber() {
    let value;
    while (true) {
        const input = await inquirer.prompt([
            { name: chalk.rgb(255, 148, 140)('Enter First Number'), type: "number" }
        ]);
        value = await input['\x1B[38;2;255;148;140mEnter First Number\x1B[39m'];
        if (!isNaN(value)) {
            break;
        }
    }
    return value;
}
async function SecondNumber(prevResult) {
    let value;
    while (true) {
        const input = await inquirer.prompt([
            { name: chalk.rgb(255, 148, 140)(`Enter ${prevResult ? 'Next' : 'Second'} Number`), type: "number" }
        ]);
        value = await input[`${prevResult ? '\x1B[38;2;255;148;140mEnter Next Number\x1B[39m' : '\x1B[38;2;255;148;140mEnter Second Number\x1B[39m'}`];
        if (!isNaN(value)) {
            break;
        }
    }
    return value;
}
async function Operator() {
    const input = await inquirer.prompt([
        { name: chalk.rgb(255, 148, 140)('Enter Operator'), type: "list", choices: [{ name: 'Addition', value: 'A' }, { name: 'Subtraction', value: 'S' }, { name: 'Multilication', value: 'M' }, { name: 'Division', value: 'D' }] }
    ]);
    let operator = input['\x1B[38;2;255;148;140mEnter Operator\x1B[39m'];
    return operator;
}
// Program Entry Point
let restart = true;
let prevResult = false;
let result;
while (restart) {
    let firstnumber = !prevResult ? await FirstNunber() : result;
    let operator = await Operator();
    let secondnumber = await SecondNumber(prevResult);
    // Spinner
    const spinner = createSpinner('Calculating').start();
    await sleep();
    spinner.success({ text: 'Calculated' });
    // End Spinner
    result = operator === 'A' ? firstnumber + secondnumber : operator === 'S' ? firstnumber - secondnumber : operator === 'M' ? firstnumber * secondnumber : operator === 'D' ? firstnumber / secondnumber : 0;
    console.log(chalk.bgBlack.whiteBright.bold(`${firstnumber} ${operator === 'A' ? '+' : operator === 'S' ? '-' : operator === 'M' ? 'x' : operator === 'D' ? '/' : 'invalid operator'} ${secondnumber} = ${result}`));
    const input = await inquirer.prompt([
        { name: chalk.rgb(255, 255, 160)('Make your choice'), type: "list", choices: [{ name: 'Perform operation on previous result', value: 'P' }, { name: 'Perform new operation', value: 'N' }, { name: 'Exit', value: 'E' }] }
    ]);
    let value = input['\x1B[38;2;255;255;160mMake your choice\x1B[39m'];
    if (value === 'E') {
        restart = false;
        console.clear();
    }
    if (value === 'P') {
        prevResult = true;
    }
    if (value === 'N') {
        prevResult = false;
        console.clear();
    }
}
