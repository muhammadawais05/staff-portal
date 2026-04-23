const path = require('path');
const { PackageInfo } = require('./package-info/package-info');
const Codeowners = require('./codeowners/codeowners');
const readFiles = require('./read-files');
const { NO_OWNER } = require('../config');
const fileNameToPackage = require('./utils/file-name-to-package');
const OwnerToPackages = require('./owners-info/owner-to-packages');

function processGroupedByPackage(
  groupedByPackageName,
  owners,
  packageName,
  fileName
) {
  const existingPackage = groupedByPackageName[packageName];

  if (existingPackage) {
    existingPackage.addOwners(owners, fileName);
  } else {
    // eslint-disable-next-line no-param-reassign
    groupedByPackageName[packageName] = new PackageInfo(
      packageName,
      owners,
      fileName
    );
  }
}

function processGroupedByOwner(groupedByOwnerName, owners, packageName) {
  for (const owner of owners) {
    if (groupedByOwnerName[owner]) {
      groupedByOwnerName[owner].addPackage(packageName);
    } else {
      //   eslint-disable-next-line no-param-reassign
      groupedByOwnerName[owner] = new OwnerToPackages(owner, packageName);
    }
  }
}

function processCodeBase(options) {
  let codeowners;

  const rootPath = process.cwd();

  try {
    codeowners = new Codeowners(rootPath, options.codeownersFilename);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  const filesToTeams = new Map();
  const groupedByPackageName = {};
  const groupedByOwnerName = {};

  const entries = readFiles(rootPath, options.packageName, options.strict);

  entries.forEach((file) => {
    const relativeFilePath = path
      .relative(codeowners.codeownersDirectory, file.path)
      .replace(/(\r)/g, '\\r');

    let owners = codeowners.getOwner(relativeFilePath);
    owners = owners.length ? owners : [NO_OWNER];

    const packageName = fileNameToPackage(relativeFilePath);

    filesToTeams.set(relativeFilePath, {
      owners,
      package: packageName,
    });

    processGroupedByPackage(
      groupedByPackageName,
      owners,
      packageName,
      relativeFilePath
    );

    processGroupedByOwner(groupedByOwnerName, owners, packageName);
  });

  return {
    filesToTeams,
    groupedByPackageName,
    groupedByOwnerName,
  };
}

module.exports = processCodeBase;
