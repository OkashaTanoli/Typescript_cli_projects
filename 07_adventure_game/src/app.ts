// #!/usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

let sleep = () => new Promise((r) => setTimeout(r, 2000))
console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<=================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<===========>>>  ${chalk.redBright.bold('ADVENTURE GAME')}  <<<===========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<=================================>>>\n`));
console.log(chalk.bgRgb(112, 79, 1).whiteBright(' INSTRUCTIONS :'))


let maxEnemyHealth = 75
let enemyAttackDamage = 50
let enemiesList = [`Skeleton`, `Warrior `, `Zombie  `, `Assassin`]


let health = 100
let attackDamage = 50
let totalHealthPotions = 3
let healthPotionHealAmount = 30
let healthPotionDropChance = 50 // 50% chance

let attackAnimation = (enemy:string) => new Promise((r) => {
    let stepsDone: string[] = []
    let stepsLeft = ['_', '_', '_', '_', '_', '_', '_', '_']
    console.log(chalk.whiteBright.bgBlack(`ATTACK:                                          `))
    const animation = setInterval(() => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(chalk.bgBlack.whiteBright(`___________${chalk.bgRgb(0, 55, 0).whiteBright('/|You|*')}${stepsLeft.join('')}${chalk.bgRgb(55, 0, 0).whiteBright(`*|${enemy}|\\`)}${stepsDone.join('')}___________`))
        if (!stepsLeft.length) {
            process.stdout.write('\n')
            clearInterval(animation)
            r('')
        }
        stepsLeft.pop()
        stepsDone.push('_')
    }, 300);
})

console.log(`=) You can damage enemy UPTO ${attackDamage} Health`)
console.log(`=) Enemy can damage you UPTO ${enemyAttackDamage} Health`)
let running = true
let isRunAway = false

while (running) {
    let enemy = enemiesList[Math.floor(Math.random() * enemiesList.length)]
    let enemyHealth = Math.ceil(Math.random() * maxEnemyHealth)
    console.log(chalk.whiteBright(chalk.yellowBright(`\n\n<<<<<<<<<<<<<<  ${chalk.blueBright(`${enemy.trim()} Has Appeared`)}  >>>>>>>>>>>>>>\n`)))

    while (enemyHealth > 0) {
        console.log(chalk.whiteBright(`----------------------------`))
        console.log(`Your Health: ${health}`)
        console.log(chalk.whiteBright(`----------------------------`))
        console.log(`${enemy.trim()}'s Health: ${enemyHealth}`)
        console.log(chalk.whiteBright(`----------------------------`))
        const { choice }: { choice: 'Attack' | 'Drink Health Potion' | 'Run' } = await inquirer.prompt([{
            name: 'choice',
            message: 'What would you like to do ?',
            type: 'rawlist',
            choices: ['Attack', 'Drink Health Potion', 'Run']
        }])
        if (choice === 'Attack') {
            let damageDealt = Math.ceil(Math.random() * attackDamage)
            let damageTaken = Math.ceil(Math.random() * enemyAttackDamage)

            health -= damageTaken
            enemyHealth -= damageDealt

            await attackAnimation(enemy)

            console.log(`${chalk.redBright('>>>')} You strike the ${enemy.trim()} for ${chalk.redBright(damageDealt)} damage`)
            console.log(`${chalk.redBright('>>>')} ${enemy.trim()} damaged you for ${chalk.redBright(damageTaken)}`)
            if (health < 1) {
                break
            }
        }
        else if (choice === 'Drink Health Potion') {
            if (totalHealthPotions > 0) {
                let spinner = createSpinner('Healing').start()
                await sleep()
                totalHealthPotions--
                health += healthPotionHealAmount
                spinner.success({text:'Healed Up'})
                console.log(`${chalk.redBright('>>>')} You drink a health potion, healing yourself for ${chalk.redBright(healthPotionHealAmount)}`)
                console.log(`${chalk.redBright('>>>')} You now have ${chalk.redBright(health)} Health`)
                console.log(`${chalk.redBright('>>>')} You have ${chalk.redBright(totalHealthPotions)} health potion left`)
            }
            else {
                console.log(`${chalk.redBright('>>>')} You have 0 health potion. Defeat enemies to get a chance for one`)
            }
        }
        else {
            console.log(`${chalk.redBright('>>>')} You run away from the ${enemy.trim()}`)
            isRunAway = true
            break;
        }
        console.log(`\n`)
    }

    if (isRunAway) {
        isRunAway = false
        continue
    }
    if (health < 1 && enemyHealth < 1) {
        console.log(chalk.yellowBright(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`))
        console.log(`  ${enemy.trim()} dropped BOMB, You Both were killed`)
        console.log(chalk.yellowBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`))
        break
    }
    if (health < 1) {
        console.log(chalk.yellowBright(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`))
        console.log(`  You were defeated by the ${enemy.trim()}`)
        console.log(chalk.yellowBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`))
        break;
    }

    console.log(chalk.yellowBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`))
    console.log(`  ${enemy.trim()} was defeated !!!`)
    console.log(`  You have ${health} Health left `)

    if (Math.ceil(Math.random() * 100) < healthPotionDropChance) {
        totalHealthPotions++
        console.log(`  The ${enemy.trim()} dropped a health potion `)
        console.log(`  You now have ${totalHealthPotions} health potions`)
    }
    console.log(chalk.yellowBright(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`))

    const { choice }: { choice: 'Continue Fighting' | 'Exit' } = await inquirer.prompt([{
        name: 'choice',
        message: 'what would you like to do?',
        type: 'rawlist',
        choices: ['Continue Fighting', 'Exit']
    }])
    if (choice === 'Continue Fighting') {
        continue
    }
    break
}

console.log(chalk.blueBright(`\n\n============================================================`))
console.log(chalk.blueBright(`                 Thanks For Playing !!!!!!!                 `))
console.log(chalk.blueBright(`============================================================`))