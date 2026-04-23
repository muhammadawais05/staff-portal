const ervy = require('ervy');
const padStart = require('lodash.padstart');
const formatOwnerName = require('../utils/format-owner-name');

function printPackagesByOwnersBulletChart({ ownersInfo, unownedPackagesInfo }) {
  const series = ownersInfo
    .map(({ owner, totalPackages }) => ({
      key: `${formatOwnerName(owner)}: ${padStart(totalPackages, 3)}`,
      value: totalPackages,
    }))
    .sort(({ value: value1 }, { value: value2 }) => value2 - value1);

  if (unownedPackagesInfo) {
    series.unshift({
      key: `NO_OWNER: ${padStart(unownedPackagesInfo.totalPackages, 3)}`,
      value: unownedPackagesInfo.totalPackages,
      style: ervy.bg('red'),
    });
  }

  console.log('Packages Summary\n');

  console.log(
    ervy.bullet(series, {
      style: ervy.bg('blue'),
      width: 30,
    })
  );
}

function printFilesByOwnersBulletChart({ ownersInfo, unownedPackagesInfo }) {
  const series = ownersInfo
    .map(({ owner, totalFiles }) => ({
      key: `${formatOwnerName(owner)}: ${padStart(totalFiles, 6)}`,
      value: totalFiles,
    }))
    .sort(({ value: value1 }, { value: value2 }) => value2 - value1);

  if (unownedPackagesInfo) {
    series.unshift({
      key: `NO_OWNER: ${padStart(unownedPackagesInfo.totalFilesUnowned, 6)}`,
      value: unownedPackagesInfo.totalFilesUnowned,
      style: ervy.bg('red'),
    });
  }

  console.log('Packages Files Summary\n');

  console.log(
    ervy.bullet(series, {
      style: ervy.bg('blue'),
      width: 30,
    })
  );
}

module.exports = {
  printPackagesByOwnersBulletChart,
  printFilesByOwnersBulletChart,
};
