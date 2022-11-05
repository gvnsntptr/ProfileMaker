const LeadGuitarist = require('./lib/LeadGuitarist');
const Drummer = require('./lib/Drummer');
const Bassist = require('./lib/Bassist');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const bandMates = [];
const idBank = [];

// Inform user of usage
console.log(
  '\nWelcome to the band generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

function appMenu() {
  function createLeadGuitarist() {
    console.log('Please build your band 👥');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'LeadGuitaristName',
          message: "What is the lead guitarist's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'gtrId',
          message: "What is the lead guitarist's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'gtrEmail',
          message: "What is the lead guitarist's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'guitaristPhoneNumber',
          message: "What is the lead guitarist's phone number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
      ])
      .then((answers) => {
        const guitarist = new LeadGuitarist(
          answers.LeadGuitaristName,
          answers.gtrId,
          answers.gtrEmail,
          answers.guitaristPhoneNumber
        );
        bandMates.push(guitarist);
        idBank.push(answers.gtrId);
        createLeadGuitarist();
      });
  }

  function createBand() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'Which type of band member would you like to add?',
          choices: [
            'Drummer',
            'Bassist',
            "I don't want to add any more band members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Drummer':
            addDrummer();
            break;
          case 'Bassist':
            addBassist();
            break;
          default:
            buildYourBand();
        }
      });
  }

  function addDrummer() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'drmName',
          message: "What is your drummer's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'drmId',
          message: "What is your drummer's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idBank.includes(answer)) {
                return 'This ID is already taken. Please enter a different number.';
              } else {
                return true;
              }
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'drmEmail',
          message: "What is your drummer's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'drmSticks',
          message: "What drum sticks does your drummer use?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
      ])
      .then((answers) => {
        const drummer = new Drummer(
          answers.drmName,
          answers.drmId,
          answers.drmEmail,
          answers.drmSticks
        );
        bandMates.push(drummer);
        idBank.push(answers.drmId);
        createBand();
      });
  }

  function addBassist() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'bgtrName',
          message: "What is your bass guitarist's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'bgtrId',
          message: "What is your bass guitarist's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idBank.includes(answer)) {
                return 'This ID is already taken. Please enter a different number.';
              } else {
                return true;
              }
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'bgtrEmail',
          message: "What is your bass Guitarist's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'bgtrBass',
          message: "What model of bass does your bass guitarist play?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
      ])
      .then((answers) => {
        const bassist = new Bassist(
          answers.bgtrName,
          answers.bgtrId,
          answers.bgtrEmail,
          answers.bgtrBass
        );
        bandMates.push(bassist);
        idBank.push(answers.bgtrId);
        createBand();
      });
  }

  function buildYourBand() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(bandMates), 'utf-8');
  }

  createLeadGuitarist();
}

appMenu();