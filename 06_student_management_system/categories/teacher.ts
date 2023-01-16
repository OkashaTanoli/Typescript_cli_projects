import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import {  Course, Teacher } from '../classes/classes.js';

let sleep = () => new Promise((r) => setTimeout(r, 1000))



// Add Teacher Function

export async function AddTeacher(DetailsInputs: (type: string, name: string) => Promise<string | number>, teachers: Teacher[]) {
    const teacher_name = await DetailsInputs('', 'Name') as string
    const teacher_age = await DetailsInputs('number', 'Age') as number

    let teacher = new Teacher(teacher_name, teacher_age)

    //Spinner
    const spinner = createSpinner('Adding Teacher').start()
    await sleep()

    teachers.push(teacher)
    spinner.success({ text: chalk.greenBright("Teacher Added Successfully") })
}




// View Teachers Function

export async function ViewTeachers(teachers: Teacher[], courses: Course[]) {
    if (!teachers.length) {
        console.log(chalk.redBright('############ No Teacher Available ############'))
        return
    }
    console.table(teachers.map((val) => {
        return {
            teacherID: val.teacherID,
            Name: val.name,
            Age: val.age,
            Courses: val.courses.length ? val.courses.map((course) => course.name).join(',') : "Not Assigned"
        }
    }))
    const input = await inquirer.prompt([{
        name: 'index',
        message: 'Enter Index to Assign Course OR Any key to Exit : ',
        type: 'number'
    }])
    const index: number = await input['index']
    if (index <= teachers.length - 1 && index >= 0) {
        if (!courses.length) {
            console.log(chalk.redBright('############ NO COURSE AVAILABLE ############'))
            return
        }

        const input = await inquirer.prompt([{
            name: 'course',
            message: 'Select Course: ',
            type: 'list',
            choices: courses.map((val) => { return { name: val.name, value: val.id } })
        }])
        let course_id: number = await input['course']
        let course = courses.filter((val) => val.id === course_id)[0]
        let teacher = teachers.at(index)
        //Spinner
        const spinner = createSpinner('Assigning Course').start()
        await sleep()
        if (teacher?.courses.includes(course)) {
            spinner.error({ text: chalk.redBright('############ Course Is Already Assigned To Teacher ############') })
            return
        }
        teacher?.assignCourse(course)
        teacher?.addTeacherInCourseTeacher(course)
        spinner.success({ text: chalk.greenBright("Course Assigned To Teacher Successfully") })
    }

}