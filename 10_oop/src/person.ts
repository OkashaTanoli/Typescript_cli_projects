export class Person {
    private _personality!: string
    constructor() {
        this._personality = "Mystery"
    }
    AskQuestion(answer:number) {
        if(answer === 1){
            this._personality = "Extrovert"
        }
        else if(answer === 2){
            this._personality = "Introvert"
        }
        else{
            this._personality = "Mystery" 
        }
    }
    GetPersonality(){
        return this._personality
    }
}

