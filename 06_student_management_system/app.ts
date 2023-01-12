// #!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

let sleep = () => new Promise((r) => setTimeout(r, 2000))

class Person {
    constructor(public name: string, age: number) { }
}
class Course {
    name: string
    timing: string
    students: Student[] = []
    teacher!: Teacher
    constructor(name: string, timing: string) {
        this.name = name
        this.timing = timing
    }
    registerStudent(student: Student) {
        this.students.push(student)
        student.registerInCourse(this)
    }
    setTeacher(teacher: Teacher) {
        this.teacher = teacher
        teacher.assignCourse(this)
    }

}

class Student extends Person {
    rollNo: number
    courses: Course[] = []
    constructor(name: string, age: number, rollNo: number) {
        super(name, age)
        this.rollNo = rollNo
    }
    registerInCourse(course: Course) {
        this.courses.push(course)
    }

}

class Teacher extends Person {
    id: number
    courses: Course[] = []
    constructor(name: string, age: number, id: number) {
        super(name, age)
        this.id = id
    }
    assignCourse(course: Course) {
        this.courses.push(course)
    }
}

function MakeChoice() {
    const input = inquirer.prompt([{
        name:'choice',
        message:"Select One"
    }])
}

const std1 = new Student('okahsa', 19, Math.floor(Math.random() * 99999))
const std2 = new Student('ali', 20, Math.floor(Math.random() * 99999))

const teacher1 = new Teacher("Amir", 40, Math.floor(Math.random() * 99999))
const teacher2 = new Teacher("Zia", 45, Math.floor(Math.random() * 99999))

const course1= new Course('BC',"Monday")
course1.registerStudent(std1)
course1.setTeacher(teacher1)

console.log(course1.students[0])