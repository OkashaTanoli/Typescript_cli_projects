// #!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';


console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<===================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<========>>>  ${chalk.redBright.bold('COUNTDOWN TIMER')}  <<<========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<===================================>>>\n`));

let sleep = () => new Promise((r) => setTimeout(r, 2000))

async function SetDateAndTime(name: string, regex: RegExp) {
    let isDate = name === 'Date' ? true : false
    let date_time: string;
    while (true) {

        const input = await inquirer.prompt([{
            name: 'date_and_time',
            message: chalk.whiteBright(`Enter ${name} : `),
            default: isDate ? '1/25/2024' : '12:00 AM',
        }])
        date_time = await input['date_and_time']
        if (regex.test(date_time)) {
            break
        }
        else {
            console.log(chalk.redBright(`Enter Correct Pattern Of ${name}`))
        }
    }
    return date_time
}

function StartTimer(complete_date: string) {
    console.log(chalk.bgRgb(128, 94, 1).whiteBright(` Days | Hours | Minutes | Seconds `))
    const timer = setInterval(() => {
        let newDate = (new Date() as unknown) as number
        let myDate = (new Date(complete_date) as unknown) as number
        let time_milli_seconds = myDate - newDate
        if (time_milli_seconds < 0) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            console.log(chalk.redBright('Expired'))
            console.log(chalk.whiteBright(`=======================================================\n`))
            clearInterval(timer)
            return
        }

        let sec_con = 1000 // Milliseconds in a Second
        let min_con = sec_con * 60 // Milliseconds in a Minute
        let hour_con = min_con * 60 // Milliseconds in an Hour
        let days_con = hour_con * 24 // Milliseconds in a Day

        let days = Math.floor(time_milli_seconds / days_con)
        let hours = Math.floor((time_milli_seconds % days_con) / hour_con)
        let mins = Math.floor((time_milli_seconds % hour_con) / min_con)
        let secs = Math.floor((time_milli_seconds % min_con) / sec_con)
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`  ${days > 9 ? String(days) : `0${String(days)}`}  :   ${hours > 9 ? String(hours) : `0${String(hours)}`}  :   ${mins > 9 ? String(mins) : `0${String(mins)}`}    :   ${secs > 9 ? String(secs) : `0${String(secs)}`}`);


    }, 1000);

}



console.log(chalk.bgRgb(79, 1, 61).whiteBright(`                 `))
console.log(chalk.bgRgb(79, 1, 61).whiteBright(`  Instructions:  `))
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Date Format: ${chalk.bgRgb(56, 56, 56).whiteBright(' MM/DD/YYYY [Year Limit 2023-2025] ')} Example: ${chalk.bgRgb(56, 56, 56).whiteBright(' 1/25/2024 ')}.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Time Format: ${chalk.bgRgb(56, 56, 56).whiteBright(' Hours[0-12]:Minutes[0-59] PM/AM ')} Example: ${chalk.bgRgb(56, 56, 56).whiteBright(' 11:30 AM ')}.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Timer Will Be Expired If Time Is Ended.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Press ${chalk.bgRgb(56, 56, 56).whiteBright(' Ctrl + C ')} To Stop Timer.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------\n`))


let dateRegex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/](202[3-5])$/
let timeRegx = /^(0?[0-9]|[1][012]):(0?[0-9]|[1-5][0-9]) ((a|p)m|(A|P)M)$/
let date = await SetDateAndTime("Date", dateRegex)
let time = await SetDateAndTime("Time", timeRegx)
let complete_date = `${date} ${time}`
let spinner = createSpinner('Starting Timer').start()
await sleep()
spinner.success({text:"Timer Started Successfully"})
console.log(chalk.whiteBright(`\n=======================================================`))
StartTimer(complete_date)
