#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';


console.log(chalk.bold.rgb(204, 204, 204)('TODO APP'));

type Todos = {
    text: string;
    id: number;
    completed: boolean
}
let todos: Todos[] = [{ text: 'dummy', id: Math.floor(Math.random() * 9999999999), completed: false }]

let sleep = () => new Promise((r) => setTimeout(r, 2000))

const Options = async () => {
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)('What You Want To Do'),
            type: "list",
            choices: [
                { name: 'Add New Todo', value: 'A' },
                { name: 'Display All Todos', value: 'D' },
                { name: 'Remove Todo', value: 'R' }
            ]
        }
    ])
    let value: string = await input['\x1B[38;2;255;255;160mWhat You Want To Do\x1B[39m']
    return value
}

const AddTodo = async () => {
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 148, 140)('Enter TODO'),
        }
    ])
    let value = await input['\x1B[38;2;255;148;140mEnter TODO\x1B[39m']
    todos.push({ text: value, id: Math.floor(Math.random() * 9999999999), completed: false })
    const spinner = createSpinner('Adding Todo').start()
    await sleep()
    spinner.success({ text: "Todo added successfully" })
}

const RemoveTodo = async () => {
    if (!todos.length) {
        console.log(chalk.redBright("No Todo Available"))
        return
    }

    let todo = todos.map((val) => {
        return { name: val.text, value: val.id }
    })
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)('Delete TODO'),
            type: "list",
            choices: todo
        }
    ])
    let value: number = await input['\x1B[38;2;255;255;160mDelete TODO\x1B[39m']
    todos = todos.filter((val) => val.id !== value)
    const spinner = createSpinner('Deleting Todo').start()
    await sleep()
    spinner.success({ text: "Todo deleted successfully" })
}


const DisplaySingleTodo = async (todo: Todos) => {
    console.log(chalk.bgBlack.whiteBright(`Todo: ${todo.text}`))
    console.log(chalk.bgBlack.whiteBright(`Status: ${todo.completed ? 'Completed' : 'Not Completed'}`))
    if (!todo.completed) {
        const input = await inquirer.prompt([
            {
                name: chalk.rgb(255, 255, 160)('Do you want to complete it ?'),
                type: "confirm",
            }
        ])
        let value = await input['\x1B[38;2;255;255;160mDo you want to complete it ?\x1B[39m']
        if (value) {
            todos = todos.map((val) => {
                if (val.id === todo.id) {
                    val.completed = true
                    return val
                }
                return val
            })
            const spinner = createSpinner('Updating Todo').start()
            await sleep()
            spinner.success({ text: "Todo updated successfully" })
        }
    }

}

const DisplayTodos = async () => {
    if (!todos.length) {
        console.log(chalk.redBright("No Todo Available"))
        return
    }

    let todo = todos.map((val) => {
        return { name: val.text, value: val }
    })
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)('Select TODO'),
            type: "list",
            choices: todo
        }
    ])
    let value = await input['\x1B[38;2;255;255;160mSelect TODO\x1B[39m']
    await DisplaySingleTodo(value)

}


// Program Entry Point

while (true) {
    let option = await Options()
    if (option === 'A') {
        await AddTodo()
    }
    if (option === 'D') {
        await DisplayTodos()
    }
    if (option === 'R') {
        await RemoveTodo()
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