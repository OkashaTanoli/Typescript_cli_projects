import { BankAccount } from "./account.js"

export class Customer {
    name: string
    userId:string
    age: number
    contactNumber: string
    pin: number
    bankAccount: BankAccount

    constructor(name: string, age: number, contactNumber: string, pin: number,userId:string) {
        this.name = name
        this.age = age
        this.contactNumber = contactNumber
        this.pin = pin
        this.userId = userId
        this.bankAccount = new BankAccount()
    }
}
