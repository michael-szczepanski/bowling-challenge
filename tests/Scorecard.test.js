const Scorecard = require('../src/Scorecard.js')

let scorecard

describe('Scorecard', () => {
  beforeEach(() => {
    scorecard = new Scorecard()
  })

  test('passes exercise example', () => {
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
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(0, 0)
      }
      scorecard.addFrame(0, 0, 0)
      expect(scorecard.calculateScore()).toEqual(0)
    })

    test('counts scores for a partial game', () => {
      scorecard.addFrame(2, 5)
      scorecard.addFrame(3, 5)
      expect(scorecard.calculateScore()).toEqual(15)
    })

    test('counts scores for a game with no strikes/spares, and gutter in second roll', () => {
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(9, 0)
      }
      scorecard.addFrame(9, 0, 0)
      expect(scorecard.calculateScore()).toEqual(90)
    })

    test('counts scores for a game with no strikes/spares, and mixed rolls', () => {
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(2, 3)
      }
      scorecard.addFrame(2, 3, 0)
      expect(scorecard.calculateScore()).toEqual(50)
    })

    test('counts scores for a perfect game', () => {
      for (let i = 0; i < 9; i++) {
        scorecard.addFrame(10, 0)
      }
      scorecard.addFrame(10, 10, 10)
      expect(scorecard.calculateScore()).toEqual(300)
    })

    test('counts scores for a mixed spares game', () => {
      scorecard.addFrame(0, 10)
      scorecard.addFrame(2, 3)
      expect(scorecard.calculateScore()).toEqual(17)
    })

    test('counts scores correctly for a partial game finishing with a spare', () => {
      scorecard.addFrame(0, 10)
      expect(scorecard.calculateScore()).toEqual(10)
    })

    test('counts scores correctly for a game with partial frames', () => {
      scorecard.addScore(2)
      expect(scorecard.calculateScore()).toEqual(2)
    })
  })

  describe('calculateStrikeExtraPoints()', () => {
    test('counts scores for the next two rolls with no consecutive strike', () => {
      scorecard.addFrame(10, 0)
      scorecard.addFrame(2, 3)
      expect(scorecard.calculateStrikeExtraPoints(0)).toEqual(5)
    })

    test('counts scores if the next roll is a strike', () => {
      scorecard.addFrame(10, 0)
      scorecard.addFrame(10, 0)
      scorecard.addFrame(2, 4)
      expect(scorecard.calculateStrikeExtraPoints(0)).toEqual(12)
    })

    test('counts scores if the next two rolls are both strikes', () => {
      scorecard.addFrame(10, 0)
      scorecard.addFrame(10, 0)
      scorecard.addFrame(10, 0)
      expect(scorecard.calculateStrikeExtraPoints(0)).toEqual(20)
    })

    test('works correctly for partial games', () => {
      scorecard.addFrame(10, 0)
      expect(scorecard.calculateStrikeExtraPoints(0)).toEqual(0)
      scorecard.addFrame(10, 0)
      expect(scorecard.calculateStrikeExtraPoints(0)).toEqual(10)
    })
  })

  describe('addScore()', () => {
    test('it correctly adds score to an empty frame', () => {
      scorecard.addScore(2)
      expect(scorecard.frames).toEqual([[2, undefined]])
      scorecard.addScore(3)
      expect(scorecard.frames).toEqual([[2, 3]])
    })

    test('it correctly adds a new frame at the end of the array', () => {
      scorecard.addFrame(1, 2)
      scorecard.addScore(3)
      scorecard.addScore(4)
      expect(scorecard.frames).toEqual([[1, 2], [3, 4]])
    })

    test('it correctly adds a full frame on Strike', () => {
      scorecard.addScore(10)
      expect(scorecard.frames).toEqual([[10, 0]])
    })
  })

  describe('printScores()', () => {
    test('returns scores in correct format', () => {
      scorecard.addFrame(1, 2)
      scorecard.addFrame(3, 4)
      expect(scorecard.printScores()).toMatch('1/2')
      expect(scorecard.printScores()).toMatch('3/4')
    })
  })

  describe('gameFinished()', () => {
    test('correctly returns true on full game played', () => {
      scorecard.addFrame(1, 4)
      scorecard.addFrame(4, 5)
      scorecard.addFrame(6, 4)
      scorecard.addFrame(5, 5)
      scorecard.addFrame(10, 0)
      scorecard.addFrame(0, 1)
      scorecard.addFrame(7, 3)
      scorecard.addFrame(6, 4)
      scorecard.addFrame(10, 0)
      expect(scorecard.gameFinished()).toEqual(false)
      scorecard.addScore(2)
      expect(scorecard.gameFinished()).toEqual(false)
      scorecard.addScore(8)
      expect(scorecard.gameFinished()).toEqual(false)
      scorecard.addScore(5)
      expect(scorecard.gameFinished()).toEqual(true)
    })

    test('correctly returns true on a missed final Frame', () => {
      scorecard.addFrame(1, 4)
      scorecard.addFrame(4, 5)
      scorecard.addFrame(6, 4)
      scorecard.addFrame(5, 5)
      scorecard.addFrame(10, 0)
      scorecard.addFrame(0, 1)
      scorecard.addFrame(7, 3)
      scorecard.addFrame(6, 4)
      scorecard.addFrame(10, 0)
      expect(scorecard.gameFinished()).toEqual(false)
      scorecard.addScore(2)
      expect(scorecard.gameFinished()).toEqual(false)
      scorecard.addScore(4)
      expect(scorecard.gameFinished()).toEqual(true)
    })
  })

  describe('getLastFrame()', () => {
    test('retrieves last frame', () => {
      scorecard.addFrame(1, 4)
      expect(scorecard.getLastFrame()).toEqual([1, 4])
      scorecard.addFrame(2, 5)
      expect(scorecard.getLastFrame()).toEqual([2, 5])
    })
  })

  describe('getFrames()', () => {
    test('returns frames array', () => {
      scorecard.addFrame(1, 4)
      scorecard.addFrame(2, 5)
      expect(scorecard.getFrames()).toEqual([[1, 4], [2, 5]])
    })
  })
})
