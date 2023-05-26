const readline = require('node:readline')
const { stdin: input, stdout: output } = require('node:process')

class UserInterface {
  constructor (scorecard, io = readline) {
    this.scorecard = scorecard
    this.gameRunning = false
    this.rl = io.createInterface({ input, output })
  }

  run () {
    this.gameRunning = true
    console.clear()
    this.displayWelcomeMessage()
    this.getUserInput()
  }

  displayWelcomeMessage () {
    console.log('Welcome to Bowling Scorecard!')
  }

  displayGoodbyeMessage () {
    console.clear()
    console.log('The game has finished!')
    console.log(this.scorecard.printScores())
    console.log('Final score: ' + this.scorecard.calculateScore())
  }

  getUserInput () {
    console.log(this.scorecard.printScores())
    this.rl.question('Please enter your score, or "exit" to finish:', (answer) => {
      if (answer === 'exit') {
        this.displayGoodbyeMessage()
        this.rl.close()
        return
      }

      this.scorecard.addScore(parseInt(answer))

      if (this.scorecard.gameFinished()) {
        this.displayGoodbyeMessage()
        this.rl.close()
        return
      } else {
        console.clear()
        console.log('Your scorecard: ')
      }

      this.getUserInput()
    })
  }
}

module.exports = UserInterface
