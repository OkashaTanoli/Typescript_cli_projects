class Person {
    constructor(public name: string, public age: number) { }
}
export class Course {
    name: string
    id: number = Math.floor(Math.random() * 892734)
    timing: string
    fee: number
    students: Student[] = []
    teacher!: Teacher
    constructor(name: string, timing: string, fee: number) {
        this.name = name
        this.timing = timing
        this.fee = fee
    }
    registerStudent(student: Student) {
        this.students.push(student)
    }
    addCourseInStudentCourses(student: Student) {
        student.registerInCourse(this)
    }
    setTeacher(teacher: Teacher) {
        this.teacher = teacher
    }
    addCourseInTeacherCourses(teacher: Teacher) {
        teacher.assignCourse(this)
    }

}

export class Student extends Person {
    studentID: number = Math.floor(Math.random() * (9 * (Math.pow(10, 4)))) + (Math.pow(10, 4)) // 5 digit random number
    balance: number = 2000
    courses: Course[] = []
    constructor(name: string, age: number) {
        super(name, age)
    }
    registerInCourse(course: Course) {
        this.courses.push(course)
        this.submitFee(course.fee)
    }
    addStudentInCourseStudents(course: Course) {
        course.registerStudent(this)
    }
    submitFee(fee: number) {
        this.balance -= fee
    }
}


export class Teacher extends Person {
    teacherID: number = Math.floor(Math.random() * (9 * (Math.pow(10, 4)))) + (Math.pow(10, 4)) // 5 digit random number
    courses: Course[] = []
    constructor(name: string, age: number) {
        super(name, age)
    }
    assignCourse(course: Course) {
        this.courses.push(course)
    }
    addTeacherInCourseTeacher(course: Course) {
        course.setTeacher(this)
    }
}
