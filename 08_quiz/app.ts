// #!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
// import fs from 'fs';
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<============================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('QUIZ')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<============================>>>\n`));
let sleep = () => new Promise((r) => setTimeout(r, 2000))



interface IData {
    question: string,
    code?: string,
    options: string[],
    answer: string,
    level: string
}

const data: IData[] = require('./data.json')
// const response = fs.readFileSync(`${__dirname}\\data.json`, 'utf8');
// let data: IData[] = JSON.parse(response)




async function startQuiz(questions: IData[]) {

    let answers = []
    for (let i = 0; i < questions.length; i++) {
        console.log('\n')
        console.log(chalk.bgRgb(112, 92, 1).whiteBright(`Question ${i + 1}/${questions.length}: `))
        console.log(chalk.rgb(222, 222, 222).bold(`  ${questions[i].question}`))
        if (questions[i].code) {
            console.log(chalk.bgRgb(1, 21, 26).whiteBright(`________________CODE:________________`))
            let set_code = questions[i].code?.replace(/_/g, `   `).split('@') as string[]
            for (let j = 0; j < set_code.length; j++) {
                console.log(chalk.whiteBright(` ${chalk.bgBlack.rgb(14, 201, 39)('=)')} ${set_code[j]}`))
            }
            console.log(chalk.bgRgb(1, 21, 26).whiteBright(`_____________________________________`))
        }
        const input = await inquirer.prompt([{
            name: 'options',
            message: 'Choose Correct Option: ',
            type: 'rawlist',
            choices: questions[i].options.sort(() => (Math.random() > 0.5) ? 1 : -1)
        }])
        let value: string = await input['options']
        answers.push(value)
        if (i === questions.length - 1) {
            console.log(chalk.whiteBright(`=======================================================`))
        }
        console.log('\n')
    }
    return answers
}

async function Result(name: string, answers: string[], questions: IData[]) {
    // Spinner
    const spinner = createSpinner('Compiling Result').start()
    await sleep()

    let correct_answers = questions.map((val) => val.answer)
    let points = 0
    for (let i = 0; i < questions.length; i++) {
        if (correct_answers[i] === answers[i]) {
            points++
        }
    }
    let percentage: number = (points * 100) / questions.length
    spinner.success({ text: 'Result Compiled' })

    console.log(chalk.bgRed.whiteBright(`                Result                `))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(255, 142, 133)(` Name: ${chalk.whiteBright(name)}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(255, 142, 133)(` Marks: ${chalk.whiteBright(points + " out of " + questions.length)}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(255, 142, 133)(` Percentage: ${chalk.whiteBright(percentage.toFixed(2) + "%")}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(255, 142, 133)(` Grade: ${percentage >= 50 ? chalk.bgGreen.whiteBright(' Passed ') : chalk.bgRed.whiteBright(" Failed ")}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
}

async function NoOfQuestions() {
    let value: number
    while (true) {
        const input = await inquirer.prompt([{
            name: 'noofquestions',
            message: 'Enter No Of Questions (Max 5)',
            type: 'number'
        }])
        value = await input['noofquestions']
        if (value <= 5 && value > 0) {
            break
        }
        console.log(chalk.redBright('The Number Of Questions Should Be Between (1 - 5)'))
    }
    return value
}

async function DifficultyLevel() {
    const input = await inquirer.prompt([{
        name: 'level',
        message: 'Select Difficulty Level',
        type: 'list',
        choices: [{ name: 'Easy', value: 'easy' }, { name: 'Intermediate', value: 'intermediate' }, { name: 'Difficult', value: 'difficult' }]
    }])
    let value: string = await input['level']
    return value
}

async function Name() {
    let value: string
    while (true) {
        const input = await inquirer.prompt([{
            name: 'name',
            message: 'Enter Your Name: ',
        }])
        value = await input['name']
        if (value) {
            break
        }
    }
    return value
}



// Program Entry Point

while (true) {

    let name = await Name()
    let difficultyLevel = await DifficultyLevel()
    let noOfQuestions = await NoOfQuestions()

    // Spinner
    const spinner = createSpinner('Preparing Quiz').start()
    await sleep()

    let sorted_data = data.sort(() => (Math.random() > 0.5) ? 1 : -1)
    let questions = sorted_data.filter((val) => val.level === difficultyLevel).slice(0, noOfQuestions)
    spinner.success({ text: 'Quiz Prepared' })
    let answers = await startQuiz(questions)
    await Result(name, answers, questions)
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)(`Do You Want To Reattempt Quiz?`),
            type: "confirm",
        }
    ])
    let value: boolean = await input['\x1B[38;2;255;255;160mDo You Want To Reattempt Quiz?\x1B[39m']
    if (!value) {
        console.log(chalk.whiteBright.bold(`\n_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_\n`))
        break;
    }
    console.log(chalk.whiteBright.bold(`\n_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_x_\n`))
}