const UserInterface = require('../src/UserInterface.js')
const Scorecard = require('../src/Scorecard.js')
const Readline = require('./mocks/Readline.mock.js')

let ui, mockedScorecard, readline
jest.mock('../src/Scorecard.js')
jest.spyOn(console, 'log')

describe('UserInterface', () => {
  beforeEach(() => {
    mockedScorecard = new Scorecard()
    readline = new Readline()
    ui = new UserInterface(mockedScorecard, readline)
    Scorecard.mockClear()
  })

  describe('run()', () => {
    test('it calls displayWelcomeMessage()', () => {
      jest.spyOn(ui, 'displayWelcomeMessage')
      ui.run()
      expect(ui.displayWelcomeMessage).toHaveBeenCalledTimes(1)
    })

    test('it initializes the game loop asking for scores', () => {
      jest.spyOn(ui, 'getUserInput')
      ui.run()
      expect(ui.getUserInput).toHaveBeenCalled()
    })
  })

  describe('displayWelcomeMessage()', () => {
    test('displays the correct message on screen', () => {
      ui.displayWelcomeMessage()
      expect(console.log).toHaveBeenCalledWith('Welcome to Bowling Scorecard!')
    })
  })

  describe('displayGoodbyeMessage()', () => {
    test('displays the correct message on screen', () => {
      ui.displayGoodbyeMessage()
      expect(console.log).toHaveBeenCalledWith('The game has finished!')
      expect(ui.scorecard.printScores).toHaveBeenCalled()
      expect(ui.scorecard.calculateScore).toHaveBeenCalled()
    })
  })

  describe('getUserInput', () => {
    test('it displays the scoreboard for the user', () => {
      ui.getUserInput()
      expect(ui.scorecard.printScores).toHaveBeenCalled()
    })

    test('it asks the user to enter a score', () => {
      jest.spyOn(ui.rl, 'question')
      ui.getUserInput()
      expect(ui.rl.question).toHaveBeenCalledWith('Please enter your score, or "exit" to finish:', expect.anything())
    })

    test('it exits the system if user enters "exit"', () => {
      jest.spyOn(ui.rl, 'question')
      jest.spyOn(ui, 'displayGoodbyeMessage')
      ui.rl.question.mockImplementationOnce((text, fn) => { fn() })

      ui.getUserInput('exit')
      expect(ui.rl.question).toHaveReturned()
      expect(ui.displayGoodbyeMessage).toHaveBeenCalled()
    })

    test('it adds score to user score', () => {
      jest.spyOn(ui.rl, 'question')
      ui.rl.question.mockImplementationOnce((text, fn) => { fn() })

      ui.getUserInput('2')
      expect(ui.scorecard.addScore).toHaveBeenCalledWith(parseInt('2'))
    })

    test('it finishes the game after users final shot', () => {
      jest.spyOn(ui.rl, 'question')
      jest.spyOn(ui, 'displayGoodbyeMessage')
      jest.spyOn(ui.rl, 'close')
      ui.rl.question.mockImplementationOnce((text, fn) => { fn() })
      ui.scorecard.gameFinished.mockImplementationOnce(() => { return true })

      ui.getUserInput('2')
      expect(ui.displayGoodbyeMessage).toHaveBeenCalled()
      expect(ui.rl.close).toHaveBeenCalled()
    })

    test('it refuses invalid inputs for non-integers', () => {
      jest.spyOn(ui.rl, 'question')
      jest.spyOn(ui, 'checkIfValidInput')
      ui.rl.question.mockImplementationOnce((text, fn) => { fn() })

      ui.getUserInput('banana')
      expect(ui.checkIfValidInput).toHaveBeenCalledWith('banana')
      expect(console.log).toHaveBeenCalledWith('I did not understand that input, try again')
    })
  })

  describe('checkIfValidInput()', () => {
    test('it returns true if an integer < 10 is entered', () => {
      expect(ui.checkIfValidInput('2')).toEqual(true)
      expect(ui.checkIfValidInput('3')).toEqual(true)
    })

    test('it returns false if an integer > 10 is entered', () => {
      expect(ui.checkIfValidInput('11')).toEqual(false)
      expect(ui.checkIfValidInput('12')).toEqual(false)
    })

    test('it returns false for negative numbers', () => {
      expect(ui.checkIfValidInput('-1')).toEqual(false)
      expect(ui.checkIfValidInput('-2')).toEqual(false)
    })

    test('it refuses an invalid value for second roll', () => {
      ui.scorecard.getLastFrame.mockImplementation(() => { return [2, undefined] })

      expect(ui.checkIfValidInput('9')).toEqual(false)
      expect(ui.checkIfValidInput('100')).toEqual(false)
      expect(ui.checkIfValidInput('6')).toEqual(true)
      expect(ui.checkIfValidInput('2')).toEqual(true)
    })
  })
})
