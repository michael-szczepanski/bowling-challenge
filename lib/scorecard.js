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

  calculateScore () {
    let score = 0
    this.frames.forEach((frame, index) => {
      score += frame[0]
      score += frame[1]
    })
    return score
  }
}

module.exports = Scorecard
