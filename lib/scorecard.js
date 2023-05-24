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
      if (index === 9) {
        score += frame.reduce((a, b) => a + b, 0)
        return score
      }

      if (frame[0] === 10) {
        let extra_points = this.strike_extra_points(index);
        score += extra_points;
      } else if (frame[0] + frame[1] === 10) {
        if (this.frames[index + 1] != undefined ) { score += this.frames[index + 1][0] }
      }

      score += frame[0]
      score += frame[1]
    })
    return score
  }

  strike_extra_points(index) {
    let first_extra_roll = 0
    let second_extra_roll = 0
    if (this.frames[index + 1] === undefined) { return 0 }

    first_extra_roll = this.frames[index + 1][0]

    if (first_extra_roll === 10) {
      second_extra_roll = this.frames[index + 1][1] === 10 ? 10 : this.frames[index + 2][0]
    } else {
      second_extra_roll = this.frames[index + 1][1]
    }

    return first_extra_roll + second_extra_roll
  }
}

module.exports = Scorecard
