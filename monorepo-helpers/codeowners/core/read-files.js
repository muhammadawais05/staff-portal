const { walkSync } = require('@nodelib/fs.walk');
const findUp = require('find-up');
const fs = require('fs');
const ignore = require('ignore');
const path = require('path');
const fileNameToPackage = require('./utils/file-name-to-package');

function readFiles(rootPath, packageNameOption, strictMatchOption) {
  const cwd = process.cwd();

  const gitignorePath = findUp.sync('.gitignore', { cwd });
  const gitignoreMatcher = ignore();

  if (gitignorePath) {
    gitignoreMatcher.add(fs.readFileSync(gitignorePath).toString());
  }

  return walkSync(rootPath, {
    deepFilter: (entry) => {
      const split = entry.path.split(path.sep);
      return (
        !split.includes('node_modules') &&
        !split.includes('.git') &&
        !split.includes('dist')
      );
    },
    followSymbolicLinks: false,
    entryFilter: (entry) => {
      let hasToBeProcessed = entry.dirent.isFile();

      const relativeFilePath = path.relative(cwd, entry.path);

      if (hasToBeProcessed && packageNameOption) {
        const parsedPackageName = fileNameToPackage(relativeFilePath);

        hasToBeProcessed = packageNameOption.find((packageName) =>
          strictMatchOption
            ? parsedPackageName === packageName
            : parsedPackageName.includes(packageName)
        );
      }

      hasToBeProcessed =
        hasToBeProcessed && !gitignoreMatcher.ignores(relativeFilePath);

      return hasToBeProcessed;
    },
    errorFilter: (error) =>
      error.code === 'ENOENT' ||
      error.code === 'EACCES' ||
      error.code === 'EPERM',
  });
}

readFiles.counter = 0;

module.exports = readFiles;
