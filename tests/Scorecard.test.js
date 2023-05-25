const Scorecard = require('../src/Scorecard.js')

let scorecard;

describe('Scorecard', () => {
  beforeEach(() => {
    scorecard = new Scorecard();
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
      scorecard.addFrame(0,10)
      expect(scorecard.calculateScore()).toEqual(10)
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
      scorecard.addFrame(0,10)
      expect(scorecard.calculateStrikeExtraPoints(0)).toEqual(0)
    })
  })

  describe('addScore()', () => {
    test('it correctly adds score to an empty frame', () => {
      scorecard.addScore(2);
      expect(scorecard.frames).toEqual([[2,undefined]]);
      scorecard.addScore(3);
      expect(scorecard.frames).toEqual([[2,3]]);
    })
    
    test('it correctly adds a new frame at the end of the array', () => {
      scorecard.addFrame(1,2);
      scorecard.addScore(3);
      scorecard.addScore(4);
      expect(scorecard.frames).toEqual([[1,2],[3,4]])
    })
  })

})
