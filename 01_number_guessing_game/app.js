#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
console.log(chalk.bold.rgb(204, 204, 204)('NUMBER GUESSING GAME'));
let sleep = () => new Promise((r) => setTimeout(r, 2000));
const DifficultyLevel = async () => {
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)('Select Difficulty Level'),
            type: "list",
            choices: [
                { name: 'Easy', value: 'E' },
                { name: 'Medium', value: 'M' },
                { name: 'Difficult', value: 'D' }
            ]
        }
    ]);
    let value = await input['\x1B[38;2;255;255;160mSelect Difficulty Level\x1B[39m'];
    return value;
};
const UserNumber = async (number_range) => {
    let value = 0;
    while (true) {
        const input = await inquirer.prompt([
            {
                name: chalk.rgb(255, 255, 160)(`Enter Number Between 1 to ${number_range}`),
                type: "number",
            }
        ]);
        value = await input[`\x1B[38;2;255;255;160mEnter Number Between 1 to ${number_range}\x1B[39m`];
        let float_check = String(value).split('.');
        if (value >= 1 && value <= number_range && float_check.length === 1) {
            break;
        }
    }
    return value;
};
const GuessedNumber = (difficulty) => {
    let number = Math.ceil(Math.random() * (difficulty === 'E' ? 5 : difficulty === 'M' ? 10 : 15));
    return number;
};
let total_turns = 0;
let score = 0;
while (true) {
    let difficulty = await DifficultyLevel();
    let guessedNumber = GuessedNumber(difficulty);
    let number_range = difficulty === 'E' ? 5 : difficulty === 'M' ? 10 : 15;
    let userNumber = await UserNumber(number_range);
    total_turns += 1;
    // Spinner
    const spinner = createSpinner('Guessing').start();
    await sleep();
    if (userNumber === guessedNumber) {
        spinner.success({ text: chalk.bold.italic.greenBright('Wow! You Guessed The Correct Number') });
        score += 1;
    }
    else {
        spinner.error({ text: chalk.bold.redBright('Oooo! Your Guess Is Wrong') });
    }
    // End Spinner And Result
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)(`Do You Want To Play Again ?`),
            type: "confirm",
        }
    ]);
    let value = await input['\x1B[38;2;255;255;160mDo You Want To Play Again ?\x1B[39m'];
    if (!value) {
        console.log(chalk.bold.bgRgb(0, 0, 0).whiteBright(`You guessed ${score} out of ${total_turns}`));
        break;
    }
}
