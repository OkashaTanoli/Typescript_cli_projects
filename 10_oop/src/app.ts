import { Student } from "./student.js";

import inquirer from 'inquirer';

const { num }: { num: number } = await inquirer.prompt([{
    type: 'number',
    name: 'num',
    message: 'Type 1 if you like to talk to others and 2 if you would rather keep it to yourself: '
}])

const MyStudent = new Student()
MyStudent.AskQuestion(num)
console.log(`You are: ${MyStudent.GetPersonality()}`)


const { name }: { name: string } = await inquirer.prompt([{
    name: 'name',
    message: 'Enter Your Name: '
}])

MyStudent.Name = name
console.log(`Your Name is: ${MyStudent.Name} and your personality is: ${MyStudent.GetPersonality()} `)
