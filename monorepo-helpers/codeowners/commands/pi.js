const program = require('commander');
const fs = require('fs');
const {
  getSinglePackageSummary,
  getFullPackagesSummary,
  getPackagesWithUnownedFiles,
  getPackagesWithSingleOwner,
  getPackagesWithMultipleOwners,
  getEvenlyOwnedPackagesSummary,
} = require('../core/package-info/get-slices');
const {
  printPackageSummaryBarChart,
  printPackageFilesSummaryBarChart,
} = require('../core/charts/print-packages-summary-charts');
const processCodeBase = require('../core/process-codebase');

program
  .command('pi')
  .option(
    '-c, --codeowners-filename <filename>',
    'specify CODEOWNERS filename',
    'CODEOWNERS'
  )
  .option(
    '-n, --packageName <package_name...>',
    'prints full summary for particular package name'
  )
  .option(
    '--strict',
    'works only in combination with -n, changes search method to strict equal'
  )
  .option('-a, --all', 'gives summary for all packages', true)
  .option('-u, --unowned', 'gives summary for packages with unowned files')
  .option(
    '-s, --single',
    'gives summary for packages fully owned by a single member'
  )
  .option(
    '-e, --even',
    'gives summary for packages fully and evenly owned by multiple members'
  )
  .option(
    '-m, --multiple [number_of_owners]',
    'gives summary for packages fully (but not evenly) owned by >= [number_of_owners] members'
  )
  .option('-v, --verbose', 'includes file names')
  .option('--no-cache')
  .option('--json <file_path>')
  .option('--chart')
  .action((options) => {
    const modes = {
      packageName: 'packageName',
      unowned: 'unowned',
      single: 'single',
      multiple: 'multiple',
      even: 'even',
      partial: 'partial',
      all: 'all',
    };

    // find first occurred mode
    const mode = Object.values(modes).filter((option) => options[option])[0];

    // TODO: the usage of default parameter for --multiple could be improved
    // currently if we pass it as a third argument to option()
    // it's considered to be set automatically.
    // Probable solution could be putting "multiple" to the end of the list
    if (!mode) {
      console.error(
        'Error: incomplete command, see pi -h for more information'
      );
      program.outputHelp();
      return;
    }

    if (mode === modes.multiple) {
      const castedToNumber = options.multiple === true ? 2 : +options.multiple;

      if (
        Number.isNaN(castedToNumber) ||
        castedToNumber < 2 ||
        !Number.isInteger(castedToNumber)
      ) {
        console.error(`Incorrect number of teams`);
        process.exit(1);
      }
    }

    const { filesToTeams, groupedByPackageName } = processCodeBase(options);

    let data;
    switch (mode) {
      case modes.all:
        data = getFullPackagesSummary(groupedByPackageName, options.verbose);
        break;

      case modes.packageName:
        {
          const parsedPackageNames = Object.keys(groupedByPackageName);

          const packageNames = options.packageName
            .flatMap((packageName) =>
              options.strict
                ? parsedPackageNames.find((parsed) => parsed === packageName)
                : parsedPackageNames.filter((parsed) =>
                    parsed.includes(packageName)
                  )
            )
            .filter(Boolean);

          if (!packageNames.length) {
            console.error(
              `Cannot find any package by given name "${options.packageName}"`
            );
            process.exit(1);
          }

          data = packageNames.map((packageName) =>
            getSinglePackageSummary(
              groupedByPackageName[packageName],
              options.verbose
            )
          );
        }
        break;

      case modes.unowned:
        data = getPackagesWithUnownedFiles(
          groupedByPackageName,
          options.verbose
        );
        break;

      case modes.single:
        data = getPackagesWithSingleOwner(
          groupedByPackageName,
          options.verbose
        );
        break;

      case modes.multiple:
        data = getPackagesWithMultipleOwners(
          groupedByPackageName,
          filesToTeams,
          options.multiple === true ? 2 : +options.multiple,
          options.verbose
        );
        break;

      case modes.even:
        data = getEvenlyOwnedPackagesSummary(
          groupedByPackageName,
          options.verbose
        );
        break;

      default:
        break;
    }

    if (data) {
      console.dir(data, { depth: 5 });
    }

    if (options.chart) {
      console.log('\n');
      printPackageSummaryBarChart(groupedByPackageName, filesToTeams);
      printPackageFilesSummaryBarChart(groupedByPackageName, filesToTeams);
    }

    if (options.json) {
      try {
        fs.writeFileSync(options.json, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Json file was successfully written.');
      } catch (e) {
        console.error('An error occurred during writing json file');
        process.exit(1);
      }
    }
  });
