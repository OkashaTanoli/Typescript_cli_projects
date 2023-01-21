import { Person } from "./person.js"

export class Student extends Person {
    private _name: string
    constructor() {
        super()
        this._name = ''
    }
    get Name() {
        return this._name
    }
    set Name(name: string) {
        this._name = name
    }
}