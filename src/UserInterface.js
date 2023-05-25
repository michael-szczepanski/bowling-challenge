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

    while (this.gameRunning) {
      this.getUserInput()
    }
  }

  displayWelcomeMessage() {
    console.log("Welcome to Bowling!");
  }

  getUserInput() {
    let score;
    this.rl.setPrompt('Please enter your next score or type "exit" to finish.\n');
    this.rl.prompt();
    this.rl.on('line', (answer) => {
        score = answer;
        console.log(score);
        this.rl.close();
      });
      
    this.gameRunning = false;
  }
}

module.exports = UserInterface;