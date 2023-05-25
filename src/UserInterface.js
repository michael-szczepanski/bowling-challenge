const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

class UserInterface {
  constructor(scorecard, io = readline) {
    this.scorecard = scorecard;
    this.gameRunning = false;
    this.rl = io.createInterface({ input, output });
  }

  run() {
    this.gameRunning = true;
    this.displayWelcomeMessage();
    this.getUserInput();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Bowling!");
  }

  getUserInput() {
    console.log(this.scorecard.printScores());
    this.rl.question('Please enter your score, or "exit" to finish:', (answer) => {
      this.scorecard.addScore(parseInt(answer));

      if (this.scorecard.frames !== undefined && this.scorecard.frames.length === 10) {
        this.rl.close();
        return;
      } else {
        console.clear();
        this.getUserInput();
      }
    });
  }
}

module.exports = UserInterface;