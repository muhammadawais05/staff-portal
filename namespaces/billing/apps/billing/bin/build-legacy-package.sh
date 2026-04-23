#!/usr/bin/env sh
set -e

echo "=================================="
echo "SENTRY: "$SENTRY
echo "NODE_ENV: "$NODE_ENV
echo "=================================="

### PLATFORM VERSION ###
echo 'Starting legacy version build...'

PLATFORM_PACKAGE_JSON='./dist/platform/package.json'

#! Remove dist/platform folder
rm -rf ./dist/platform

#! Trigger webpack with the proper params
echo 'Running Webpack on project...'
cross-env TS_NODE_PROJECT=\"tsconfig.webpack.json\" webpack --config ./config/webpack.prod.ts

#! Copy and update package.json
node -e "require('./bin/utils')
  .copyPackageJson({
    from: './package.json',
    to: '$PLATFORM_PACKAGE_JSON',
    entry: './index.pkg.js',
    types: './index.pkg.d.ts'
  })"

#! Update package.json dependencies
node -e "require('./bin/utils')
  .movePackageJsonDepsToDevDeps('$PLATFORM_PACKAGE_JSON')"

#! Update package.json package name
node -e "require('./bin/utils')
  .updatePackageJsonProperty({
    filePath: '$PLATFORM_PACKAGE_JSON',
    key: 'name',
    value: '@toptal/billing-frontend-legacy'
  })"

#! Copy readme file
echo 'Copying the README file...'
cp ./README.md ./dist/platform/README.md

echo 'Legacy build complete!\n\n'
