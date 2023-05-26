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

  getUserInput (mockAnswer) {
    console.log(this.scorecard.printScores())
    this.rl.question('Please enter your score, or "exit" to finish:', (answer) => {
      answer = mockAnswer === undefined ? answer : mockAnswer

      if (answer === 'exit') {
        this.displayGoodbyeMessage()
        this.rl.close()
        return
      }

      if (this.checkIfValidInput(answer) === false) {
        console.clear()
        console.log('I did not understand that input, try again')
      } else {
        this.scorecard.addScore(parseInt(answer))

        if (this.scorecard.gameFinished()) {
          this.displayGoodbyeMessage()
          this.rl.close()
          return
        } else {
          console.clear()
          console.log('Your scorecard: ')
        }
      }

      this.getUserInput()
    })
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

  checkIfValidInput (userInput) {
    const input = parseInt(userInput)
    let lastFrame = this.scorecard.getLastFrame()
    if (lastFrame === undefined) { lastFrame = [0,0] }

    if (isNaN(input)) { return false }
    if (input < 0 || input > 10) { return false }
    if (lastFrame[1] !== undefined) { return true }
    if (lastFrame[1] === undefined && lastFrame[0] + input > 10) { return false } 
    return true
  }
}

module.exports = UserInterface
