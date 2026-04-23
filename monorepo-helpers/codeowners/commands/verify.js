const intersection = require('lodash.intersection');
const program = require('commander');

const Codeowners = require('../core/codeowners/codeowners');

program
  .command('verify <path> <users...>')
  .description('verify users/teams own a specific path')
  .option(
    '-c, --codeowners-filename <codeowners_filename>',
    'specify CODEOWNERS filename',
    'CODEOWNERS'
  )
  .action((checkPath, users, options) => {
    let codeowners;

    const rootPath = process.cwd();

    // instantiate new Codeowners obj
    try {
      codeowners = new Codeowners(rootPath, options.codeownersFilename);
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }

    // call getOwner() on `path`
    const owners = codeowners.getOwner(checkPath);

    // check if any `users` are in the results of getOwner()
    const verifiedOwners = intersection(users, owners);

    // if verifiedOwners is empty, exit with error
    if (verifiedOwners.length < 1) {
      console.log(
        `None of the users/teams specified own the path ${checkPath}`
      );
      process.exit(1);
    }

    // print owners
    for (const currOwner of verifiedOwners) {
      console.log(`${checkPath}    ${currOwner}`);
    }
  });
