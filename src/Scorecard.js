class Scorecard {
  constructor () {
    this.frames = []
  }

  addFrame (roll1, roll2, roll3) {
    if (roll3 === undefined) {
      this.frames.push([roll1, roll2])
    } else {
      this.frames.push([roll1, roll2, roll3])
    }
  }

  addScore (score) {
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
    return 'Frames: ' + this.frames.map((frame) => { return frame.join('/') }).join(' # ') + `\nScore: ${this.calculateScore()}`
  }

  gameFinished () {
    if (this.frames.length < 10) { return false }

    const finalFrame = this.frames[9]
    if (finalFrame[2] !== undefined) { return true }
    if (finalFrame[1] === undefined) { return false }
    if (finalFrame[0] + finalFrame[1] === 10 || finalFrame[0] + finalFrame[1] === 20) { return false }

    return true
  }

  getLastFrame () {
    return this.frames.slice(-1)[0]
  }
}

module.exports = Scorecard
