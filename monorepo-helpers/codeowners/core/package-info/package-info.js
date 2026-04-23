// eslint-disable-next-line max-classes-per-file
const { NO_OWNER } = require('../../config');

const PackageInfoStatusCode = {
  OwnedByASingleTeam: 0,
  OwnedByAllTeamsEvenly: 1,
  OwnedByMultipleTeams: 2,
  HasUnownedFiles: 3,
};

const getStatusInfo = (owners, mostlyOwnedBy) => {
  if (owners.includes(NO_OWNER)) {
    return {
      status: 'Has unowned files',
      statusCode: PackageInfoStatusCode.HasUnownedFiles,
    };
  }

  if (owners.length === 1) {
    return {
      status: 'Fully owned by a single team',
      statusCode: PackageInfoStatusCode.OwnedByASingleTeam,
    };
  }

  if (mostlyOwnedBy.length === owners.length) {
    return {
      status: `Fully and evenly owned by ${owners.length} teams`,
      statusCode: PackageInfoStatusCode.OwnedByAllTeamsEvenly,
    };
  }

  return {
    status: 'Fully (but not evenly) owned by multiple teams',
    statusCode: PackageInfoStatusCode.OwnedByMultipleTeams,
  };
};

class OwnerInfo {
  constructor(packageFiles, fileName) {
    this.packageFiles = packageFiles;
    this.files = [fileName];
  }

  addFile(fileName) {
    this.files.push(fileName);
  }
}

class PackageInfo {
  constructor(packageName, owners, fileName) {
    this.name = packageName;
    this.ownersInfo = {};
    this.files = [];

    this.addOwners(owners, fileName);
  }

  addOwners(owners, fileName) {
    this.files.push(fileName);

    owners.forEach((owner) => {
      const existing = this.ownersInfo[owner];

      if (existing) {
        existing.addFile(fileName);
      } else {
        this.ownersInfo[owner] = new OwnerInfo(this.files, fileName);
      }
    });
  }

  get mostlyOwnedBy() {
    const realOwners = this.owners.filter(
      (ownerName) => ownerName !== NO_OWNER
    );

    const maxFilesNumber = Math.max(
      ...realOwners.map((ownerName) => this.ownersInfo[ownerName].files.length)
    );

    return realOwners
      .map((ownerName) => [ownerName, this.ownersInfo[ownerName]])
      .reduce((ownersWithMaxOwnedFiles, [ownerName, ownerInfo]) => {
        if (ownerInfo.files.length === maxFilesNumber) {
          ownersWithMaxOwnedFiles.push(ownerName);
        }

        return ownersWithMaxOwnedFiles;
      }, []);
  }

  get owners() {
    return Array.from(Object.keys(this.ownersInfo));
  }

  get hasUnownedFiles() {
    return !!this.ownersInfo[NO_OWNER];
  }

  get status() {
    return getStatusInfo(this.owners, this.mostlyOwnedBy);
  }
}

module.exports = {
  PackageInfo,
  PackageInfoStatusCode,
  getStatusInfo,
};
