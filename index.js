const Scorecard = require('./src/Scorecard.js');
const UserInterface = require('./src/UserInterface.js');

const scorecard = new Scorecard();
const ui = new UserInterface(scorecard);

ui.run();