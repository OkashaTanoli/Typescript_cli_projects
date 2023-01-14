import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { Student, Course, Teacher } from '../classes/classes.js';

let sleep = () => new Promise((r) => setTimeout(r, 1000))



//  Add Course Function

export async function AddCourse(DetailsInputs: (type: string, name: string) => Promise<string | number>, courses: Course[]) {
    const course_name = await DetailsInputs('', "Name") as string
    const course_timing = await DetailsInputs('', "Timing") as string
    const course_fee = await DetailsInputs('number', "Fee") as number

    let course = new Course(course_name, course_timing, course_fee)
    const spinner = createSpinner('Adding Course').start()
    await sleep()
    courses.push(course)
    spinner.success({ text: chalk.greenBright("Course Added Successfully") })

}



// View Courses Function

export async function ViewCourses(courses: Course[], teachers: Teacher[], students: Student[]) {
    if (!courses.length) {
        console.log(chalk.redBright('############ NO COURSE AVAILABLE ############'))
        return
    }
    console.table(courses.map((val) => {
        return {
            Name: val.name,
            Timing: val.timing,
            Students: val.students.length ? val.students?.map((student) => student.name).join(', ') : "No Student Enrolled",
            Teacher: val.teacher ? val.teacher.name : "No Teacher Assigned"
        }
    }))
    const input = await inquirer.prompt([{
        name: 'index',
        message: 'Enter Index of Course to see more OPTIONS OR Any key to Exit : ',
        type: 'number'
    }])
    const index: number = await input['index']
    if (index <= courses.length - 1 && index >= 0) {
        let course = courses.at(index) as Course

        const input2 = await inquirer.prompt([{
            name: 'choice',
            message: 'Select One',
            type: 'list',
            choices: ['Add Student', 'Assign Teacher', 'Exit']
        }])
        let choice = await input2['choice']

        if (choice === 'Exit') {
            return
        }

        // Add Student To Course
        if (choice === 'Add Student') {

            const input3 = await inquirer.prompt([{
                name: 'student',
                message: 'Enter RollNo of Student: ',
                type: 'number'
            }])
            let value: number = await input3['student']
            let student = students.find((val) => val.studentID === value)

            //Spinner
            const spinner = createSpinner('Adding Student').start()
            await sleep()

            if (!student) {
                spinner.error({ text: chalk.redBright('############ No Student With this Roll No ############') })
                return
            }
            if (student.courses.includes(course)) {
                spinner.error({ text: chalk.redBright('############ Student Already Enrolled in this Course ############') })
                return
            }
            if (student.balance < course.fee) {
                spinner.error({ text: chalk.redBright("############ STUDENT DOESN'T HAVE ENOUGH BALANCE TO PAY FEE ############") })
                return
            }
            course?.registerStudent(student)
            course.addCourseInStudentCourses(student)
            spinner.success({ text: chalk.greenBright(`Student Added In Course Successfully and RS: ${course.fee} Fee Minus From Syudent's Balance`) })
            return
        }

        // Assign Teacher To Course
        if (choice === 'Assign Teacher') {
            if (course.teacher) {
                console.log(chalk.redBright('############ Teacher Already Assigned to this Course ############'))
                return
            }
            const input3 = await inquirer.prompt([{
                name: 'teacher',
                message: 'Enter ID of Teacher: ',
                type: 'number'
            }])
            let teacher_id: number = await input3['teacher']
            let teacher = teachers.find((val) => val.teacherID === teacher_id)

            //Spinner
            const spinner = createSpinner('Assigning Teacher').start()
            await sleep()

            if (!teacher) {
                spinner.error({ text: chalk.redBright('############ No Teacher With this ID ############') })
                return
            }
            course.setTeacher(teacher)
            course.addCourseInTeacherCourses(teacher)
            spinner.success({ text: chalk.greenBright('Teacher Assigned Successfully') })
            return
        }
    }
}
