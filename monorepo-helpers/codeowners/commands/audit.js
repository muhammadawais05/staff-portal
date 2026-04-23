const padEnd = require('lodash.padend');
const path = require('path');
const program = require('commander');
const { walkStream } = require('@nodelib/fs.walk');

const Codeowners = require('../core/codeowners/codeowners');

program
  .command('audit')
  .description('list the owners for all files')
  .option('-u, --unowned', 'unowned files only')
  .option('-w, --width <columns>', 'how much should filenames be padded?', '32')
  .option(
    '-c, --codeowners-filename <codeowners_filename>',
    'specify CODEOWNERS filename',
    'CODEOWNERS'
  )
  .action((options) => {
    let codeowners;

    const rootPath = process.cwd();

    try {
      codeowners = new Codeowners(rootPath, options.codeownersFilename);
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }

    const padding = parseInt(options.width, 10);

    const stream = walkStream(rootPath, {
      deepFilter: (entry) => {
        const split = entry.path.split(path.sep);
        return !split.includes('node_modules') && !split.includes('.git');
      },
      errorFilter: (error) =>
        error.code === 'ENOENT' ||
        error.code === 'EACCES' ||
        error.code === 'EPERM',
    });

    stream.on('data', (file) => {
      const relative = path
        .relative(codeowners.codeownersDirectory, file.path)
        .replace(/(\r)/g, '\\r');

      const owners = codeowners.getOwner(relative);

      if (options.unowned) {
        if (!owners.length) {
          console.log(relative);
        }
      } else {
        console.log(
          `${padEnd(relative, padding)}    ${
            owners.length ? owners.join(' ') : 'nobody'
          }`
        );
      }
    });

    stream.on('error', (err) => {
      console.error(err);
    });
  });
