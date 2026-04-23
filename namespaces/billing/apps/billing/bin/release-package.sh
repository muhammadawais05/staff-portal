#!/usr/bin/env sh
set -e

### PLATFORM VERSION ###

#! Get the new version set by davinci
NEW_VERSION=$(node -p -e "require('./package.json').version")

#! Check if the release process was skipped
if [ "$OLD_VERSION" = "$NEW_VERSION" ]; then
    echo 'The release process is skipped and no new package version is published.'
    exit
fi

#! Build legacy package
yarn build:package:legacy

#! Publish legacy package to NPM
yarn publish ./dist/platform --new-version "$NEW_VERSION" --non-interactive
