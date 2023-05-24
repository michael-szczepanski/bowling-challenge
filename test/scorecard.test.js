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

  describe('calculateScore()', () => {
    test('counts scores for a gutter game', () => {
      const scorecard = new Scorecard()
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(0, 0)
      }
      scorecard.addFrame(0, 0, 0)
      expect(scorecard.calculateScore()).toEqual(0)
    })
  
    test('counts scores for a partial game', () => {
      const scorecard = new Scorecard()
      scorecard.addFrame(2, 5)
      scorecard.addFrame(3, 5)
      expect(scorecard.calculateScore()).toEqual(15)
    })
  
    test('counts scores for a game with no strikes/spares, and gutter in second roll', () => {
      const scorecard = new Scorecard()
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(9, 0)
      }
      scorecard.addFrame(9, 0, 0)
      expect(scorecard.calculateScore()).toEqual(90)
    })
  
    test('counts scores for a game with no strikes/spares, and mixed rolls', () => {
      const scorecard = new Scorecard()
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(2, 3)
      }
      scorecard.addFrame(2, 3, 0)
      expect(scorecard.calculateScore()).toEqual(50)
    })
  
    test('counts scores for a perfect game', () => {
      const scorecard = new Scorecard()
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(10, 0)
      }
      scorecard.addFrame(10, 10, 10)
      expect(scorecard.calculateScore()).toEqual(300)
    })

    test('counts scores for a mixed spares game', () => {
      const scorecard = new Scorecard()
      scorecard.addFrame(0,10)
      scorecard.addFrame(2,3)
      expect(scorecard.calculateScore()).toEqual(17)
    })
  })

  describe('strike_extra_points()', () => {
    test('counts scores for the next two rolls with no consecutive strike', () => {
      const scorecard = new Scorecard()
      scorecard.addFrame(10,0)
      scorecard.addFrame(2,3)
      expect(scorecard.strike_extra_points(0)).toEqual(5)
    })
  
    test('counts scores if the next roll is a strike', () => {
      const scorecard = new Scorecard()
      scorecard.addFrame(10, 0)
      scorecard.addFrame(10, 0)
      scorecard.addFrame(2, 4)
      expect(scorecard.strike_extra_points(0)).toEqual(12)
    })
  
    test('counts scores if the next two rolls are both strikes', () => {
      const scorecard = new Scorecard()
      scorecard.addFrame(10, 0)
      scorecard.addFrame(10, 0)
      scorecard.addFrame(10, 0)
      expect(scorecard.strike_extra_points(0)).toEqual(20)
    })
  })
})
