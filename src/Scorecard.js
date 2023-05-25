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
    console.log(this.frames)
    let lastFrame = this.frames.length - 1
    if (this.frames[lastFrame] === undefined || this.frames[lastFrame][1] !== undefined) {
      this.addFrame(score, undefined);
    } else {
      this.frames[lastFrame][1] = score;
    }
  }

  calculateScore () {
    let score = 0

    this.frames.forEach((frame, index) => {
      if (index === 9) {
        score += frame.reduce((a, b) => a + b, 0)
        return score
      }

      if (frame[0] === 10) {
        const extraPoints = this.calculateStrikeExtraPoints(index)
        score += extraPoints
      } else if (frame[0] + frame[1] === 10) {
        if (this.frames[index + 1] !== undefined) { score += this.frames[index + 1][0] }
      }

      score += frame[0]
      score += frame[1]
    })
    return score
  }

  calculateStrikeExtraPoints (index) {
    let firstExtraRoll = 0
    let secondExtraRoll = 0
    if (this.frames[index + 1] === undefined) { return 0 }

    firstExtraRoll = this.frames[index + 1][0]

    if (firstExtraRoll === 10) {
      secondExtraRoll = this.frames[index + 1][1] === 10 ? 10 : this.frames[index + 2][0]
    } else {
      secondExtraRoll = this.frames[index + 1][1]
    }

    return firstExtraRoll + secondExtraRoll
  }
}

module.exports = Scorecard
