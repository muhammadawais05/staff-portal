const { PackageInfoStatusCode } = require('./package-info');
const formatOwnerName = require('../utils/format-owner-name');
const { NO_OWNER } = require('../../config');

function getGeneralOwnerInfo(packageInfo, owner, ownerInfo, withFileNames) {
  return {
    owner: formatOwnerName(owner),
    totalFiles: ownerInfo.files.length,
    ...(withFileNames && { files: ownerInfo.files }),
    percentage: `${(
      (ownerInfo.files.length / packageInfo.files.length) *
      100
    ).toFixed(2)}%`,
  };
}

function getMiscFilesInfo(groupedByPackages) {
  return groupedByPackages.misc;
}

function totalFilesComparator({ totalFiles: files1 }, { totalFiles: files2 }) {
  return files2 - files1;
}

function calculateTotalFiles(transformedPackagesInfo) {
  return transformedPackagesInfo.reduce(
    (total, packageInfo) => total + packageInfo.totalFiles,
    0
  );
}

function calculateTotalUnownedFiles(transformedPackagesInfo) {
  return transformedPackagesInfo.reduce(
    (total, packageInfo) => total + packageInfo.totalUnownedFiles,
    0
  );
}

function calculateUnownedFilesPercentage(transformedPackagesInfo) {
  return `${(
    (calculateTotalUnownedFiles(transformedPackagesInfo) /
      calculateTotalFiles(transformedPackagesInfo)) *
    100
  ).toFixed(2)}%`;
}

function calculateTotalOverlappedFiles(transformedPackagesInfo) {
  return transformedPackagesInfo.reduce(
    (total, packageInfo) => total + packageInfo.totalOverlappedFiles ?? 0,
    0
  );
}

function getSinglePackageSummary(packageInfo, withFileNames) {
  const { name, files, owners, mostlyOwnedBy, status, ownersInfo } =
    packageInfo;
  const totalUnownedFiles = packageInfo.ownersInfo[NO_OWNER]?.files.length ?? 0;

  return {
    name,
    totalFiles: files.length,
    totalUnownedFiles,
    unownedFilesPercentage: `${(
      (totalUnownedFiles / files.length) *
      100
    ).toFixed(2)}%`,
    owners: owners.map(formatOwnerName),
    mostlyOwnedBy,
    status: status.status,
    statusCode: status.statusCode,

    ...(withFileNames && { files }),
    ownersInfo: Object.entries(ownersInfo).map(([owner, ownerInfo]) =>
      getGeneralOwnerInfo(packageInfo, owner, ownerInfo, withFileNames)
    ),
  };
}

function getFullPackagesSummary(groupedByPackages, withFileNames) {
  const transformed = Object.values(groupedByPackages).map((packageInfo) =>
    getSinglePackageSummary(packageInfo, withFileNames)
  );

  return {
    description: 'Packages summary',
    total: transformed.length,
    totalFiles: calculateTotalFiles(transformed),
    totalUnownedFiles: calculateTotalUnownedFiles(transformed),
    unownedFilesPercentage: calculateUnownedFilesPercentage(transformed),
    packages: transformed,
  };
}

function getPackagesWithUnownedFiles(groupedByPackages, withFileNames) {
  const transformed = Object.values(groupedByPackages)
    .filter(({ ownersInfo }) => !!ownersInfo[NO_OWNER])
    .map((packageInfo) => getSinglePackageSummary(packageInfo, withFileNames))
    .sort(totalFilesComparator);

  return {
    description: 'Packages with unowned files',
    total: transformed.length,
    totalFiles: calculateTotalFiles(transformed),
    totalUnownedFiles: calculateTotalUnownedFiles(transformed),
    unownedFilesPercentage: calculateUnownedFilesPercentage(transformed),
    packages: transformed,
  };
}

function getPackagesWithSingleOwner(groupedByPackages, withFileNames) {
  const transformed = Object.values(groupedByPackages)
    .filter(
      (packageInfo) =>
        packageInfo.owners.length === 1 && !packageInfo.hasUnownedFiles
    )
    .map((packageInfo) => {
      const summary = getSinglePackageSummary(packageInfo, withFileNames);
      delete summary.ownersInfo;
      delete summary.mostlyOwnedBy;

      return summary;
    })
    .sort(totalFilesComparator);

  return {
    description: 'Packages owned by a single team',
    total: transformed.length,
    totalFiles: calculateTotalFiles(transformed),
    packages: transformed,
  };
}

function getEvenlyOwnedPackagesSummary(groupedByPackages, withFileNames) {
  const transformed = Object.values(groupedByPackages)
    .filter(
      (packageInfo) =>
        packageInfo.status.statusCode ===
        PackageInfoStatusCode.OwnedByAllTeamsEvenly
    )
    .map((packageInfo) => {
      const summary = getSinglePackageSummary(packageInfo, withFileNames);
      delete summary.ownersInfo;
      delete summary.mostlyOwnedBy;

      return summary;
    })
    .sort(totalFilesComparator);

  return {
    description: 'Packages fully and evenly owned by multiple teams',
    total: transformed.length,
    totalFiles: calculateTotalFiles(transformed),
    totalUnownedFiles: calculateTotalUnownedFiles(transformed),
    unownedFilesPercentage: calculateUnownedFilesPercentage(transformed),
    packages: transformed,
  };
}

function getHasMultipleOwnersFilter(filesToTeams) {
  return (file) => filesToTeams.get(file).owners.length > 1;
}

function getOverlappedFilesReducer(filesToTeams) {
  const hasMultipleOwners = getHasMultipleOwnersFilter(filesToTeams);

  return (total, file) => total + hasMultipleOwners(file);
}

// Fully (but not evenly owned) by multiple teams
function getPackagesWithMultipleOwners(
  groupedByPackages,
  filesToTeams,
  moreThan,
  withFileNames
) {
  const overlappedReducer = getOverlappedFilesReducer(filesToTeams);
  const hasMultipleOwnersFilter = getHasMultipleOwnersFilter(filesToTeams);

  const transformed = Object.values(groupedByPackages)
    .filter(
      ({ status, owners }) =>
        status.statusCode === PackageInfoStatusCode.OwnedByMultipleTeams &&
        owners.filter((owner) => owner !== NO_OWNER).length >= moreThan
    )
    .map((packageInfo) => ({
      ...getSinglePackageSummary(packageInfo, withFileNames),
      totalOverlappedFiles: packageInfo.files.reduce(overlappedReducer, 0),
      ...(withFileNames && {
        overlappedFiles: packageInfo.files.filter(hasMultipleOwnersFilter),
      }),
      ownersInfo: Object.entries(packageInfo.ownersInfo)
        .map(([owner, ownerInfo]) => ({
          ...getGeneralOwnerInfo(packageInfo, owner, ownerInfo, withFileNames),
          totalOverlappedFiles: ownerInfo.files.reduce(overlappedReducer, 0),
          ...(withFileNames && {
            overlappedFiles: ownerInfo.files.filter(hasMultipleOwnersFilter),
          }),
        }))
        .sort(totalFilesComparator),
    }))

    .sort(totalFilesComparator);

  return {
    description: `Packages fully (but not evenly) owned by ${moreThan}+ teams`,
    total: transformed.length,
    totalFiles: calculateTotalFiles(transformed),
    totalUnownedFiles: calculateTotalUnownedFiles(transformed),
    unownedFilesPercentage: calculateUnownedFilesPercentage(transformed),
    totalOverlappedFiles: calculateTotalOverlappedFiles(transformed),
    packages: transformed,
  };
}

module.exports = {
  getMiscFilesInfo,
  getSinglePackageSummary,
  getFullPackagesSummary,
  getPackagesWithUnownedFiles,
  getPackagesWithSingleOwner,
  getEvenlyOwnedPackagesSummary,
  getPackagesWithMultipleOwners,
};
