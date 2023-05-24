const Scorecard = require('../lib/scorecard.js')

describe('Scorecard', () => {
  test('passes exercise example', () => {
    const scorecard = new Scorecard()
    scorecard.addFrame(1, 4)
    scorecard.addFrame(4, 5)
    scorecard.addFrame(6, 4)
    scorecard.addFrame(5, 5)
    scorecard.addFrame(10, 0)
    scorecard.addFrame(0, 1)
    scorecard.addFrame(7, 3)
    scorecard.addFrame(6, 4)
    scorecard.addFrame(10, 0)
    scorecard.addFrame(2, 8, 6)
    expect(scorecard.calculateScore()).toEqual(133)
  })

  test('calculateScore() counts scores for a gutter game', () => {
    const scorecard = new Scorecard()
    for (let i = 0; i < 9; i++) {
      scorecard.addFrame(0, 0)
    }
    scorecard.addFrame(0, 0, 0)
    expect(scorecard.calculateScore()).toEqual(0)
  })

  test('calculateScore() counts scores for a partial game', () => {
    const scorecard = new Scorecard()
    scorecard.addFrame(2, 5)
    scorecard.addFrame(3, 5)
    expect(scorecard.calculateScore()).toEqual(15)
  })

  test('calculateScore() counts scores for a game with no strikes/spares, and gutter in second roll', () => {
    const scorecard = new Scorecard()
    for (let i = 0; i < 9; i++) {
      scorecard.addFrame(9, 0)
    }
    scorecard.addFrame(9, 0, 0)
    expect(scorecard.calculateScore()).toEqual(90)
  })

  test('calculateScore() counts scores for a game with no strikes/spares, and mixed rolls', () => {
    const scorecard = new Scorecard()
    for (let i = 0; i < 9; i++) {
      scorecard.addFrame(2, 3)
    }
    scorecard.addFrame(2, 3, 0)
    expect(scorecard.calculateScore()).toEqual(50)
  })
})
