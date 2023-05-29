class Scorecard {
  constructor () {
    this.frames = []
  }

  addFrame (roll1, roll2, roll3) {
    // Takes 2 or 3 integer numbers
    // Adds an extra frame to the this.frames array.
    // Roll 3 is ignored if not provided
    // Returns nothing
    if (roll3 === undefined) {
      this.frames.push([roll1, roll2])
    } else {
      this.frames.push([roll1, roll2, roll3])
    }
  }

  addScore (score) {
    // Takes an integer number
    // Adds a score to the Scorecard. Will either update the last frame of this.frames array
    // Or create a new array if there is not space in the last one
    // Returns nothing
    const lastFrame = this.frames.length - 1

    if (lastFrame === 9) {
      this.frames[lastFrame][1] === undefined ? this.frames[lastFrame][1] = score : this.frames[lastFrame][2] = score
    } else if (this.frames[lastFrame] === undefined || this.frames[lastFrame][1] !== undefined) {
      score === 10 && lastFrame !== 8 ? this.addFrame(10, 0) : this.addFrame(score, undefined)
    } else {
      this.frames[lastFrame][1] = score
    }
  }

  calculateScore () {
    // Takes no arguments
    // Returns an integer representing the score according to standard bowling rules
    // The scores may not be accurate if the scores are still waiting for the Strike resolution
    let score = 0

    this.frames.forEach((frame, index) => {
      if (index === 9) {
        score += frame.reduce((a, b) => { return a + (b || 0) }, 0)
        return score
      }

      if (frame[0] === 10) {
        const extraPoints = this.calculateStrikeExtraPoints(index)
        score += extraPoints
      } else if (frame[0] + frame[1] === 10) {
        if (this.frames[index + 1] !== undefined) { score += this.frames[index + 1][0] }
      }

      score += frame[0]
      if (frame[1] !== undefined) { score += frame[1] }
    })
    return score
  }

  calculateStrikeExtraPoints (index) {
    // Takes an index representing the frame in this.frames array based on which frame the strike happened
    // Looks for the next 2 relevant rolls and
    // Returns a sum of points of those two rolls
    let firstExtraRoll = 0
    let secondExtraRoll = 0
    if (this.frames[index + 1] === undefined) { return 0 }

    firstExtraRoll = this.frames[index + 1][0]

    if (firstExtraRoll === 10) {
      secondExtraRoll = this.frames[index + 1][1] === 10
        ? 10
        : (
            this.frames[index + 2] === undefined ? 0 : this.frames[index + 2][0]
          )
    } else {
      secondExtraRoll = this.frames[index + 1][1]
    }

    return firstExtraRoll + secondExtraRoll
  }

  printScores () {
    // Takes no arguments
    // Returns a string representation of this.frames array with rolls separated by / and frames separated by #
    return 'Frames: ' + this.frames.map((frame) => { return frame.join('/') }).join(' # ') + `\nScore: ${this.calculateScore()}`
  }

  gameFinished () {
    // Takes no arguments
    // Returns a true or false based on wether or not the user still has legal rolls that they can take in the current game
    if (this.frames.length < 10) { return false }

    const finalFrame = this.frames[9]
    if (finalFrame[2] !== undefined) { return true }
    if (finalFrame[1] === undefined) { return false }
    if (finalFrame[0] + finalFrame[1] === 10 || finalFrame[0] + finalFrame[1] === 20) { return false }

    return true
  }

  getLastFrame () {
    // Takes no arguments
    // Returns the last frame of this.frames array
    return this.frames.slice(-1)[0]
  }

  getFrames() {
    // Takes no arguments
    // Returns this.frames
    return this.frames
  }
}

module.exports = Scorecard
