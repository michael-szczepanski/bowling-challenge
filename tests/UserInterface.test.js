const UserInterface = require('../src/UserInterface.js')
const Scorecard = require('../src/Scorecard.js')

let ui, mockedScorecard;
jest.mock('../src/Scorecard.js')
jest.spyOn(console, 'log')

describe('UserInterface', () => {
  beforeEach(() => {
    mockedScorecard = new Scorecard();
    let ioDouble = { 
      createInterface: () => { return {
        question: () => {  }
        }
      }
    }
    ui = new UserInterface(mockedScorecard, ioDouble)
    Scorecard.mockClear();
  })

  describe("run()", () => {
    test('it calls displayWelcomeMessage()', () => {
      jest.spyOn(ui, 'displayWelcomeMessage');
      ui.run();
      expect(ui.displayWelcomeMessage).toHaveBeenCalledTimes(1);
    })

    test('it initializes the game loop asking for scores', () => {
      jest.spyOn(ui, 'getUserInput');
      ui.run();
      expect(ui.getUserInput).toHaveBeenCalled();
    });
  })

  describe("displayWelcomeMessage()", () => {
    test('displays the correct message on screen', () => {
      ui.displayWelcomeMessage();
      expect(console.log).toHaveBeenCalledWith('Welcome to Bowling Scorecard!');
    })
  })

  describe("getUserInput()", () => {
    test('returns inserted value', () => {

    })
  })
})