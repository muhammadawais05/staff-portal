#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR="${SCRIPT_DIR}/.."

# Supported ports or hosts can be found in https://github.com/toptal/platform/blob/master/config/settings/development.yml#L98

if [[ $NODE_ENV == "temploy" ]]; then
  echo "Running against temploy"
  HOST=local-development.toptal.rocks
  PORT=4015
  HTTPS=true
elif [[ $NODE_ENV == "local_development" ]]; then
  echo "Running against local platform"
  HOST=localhost
  PORT=4015
  HTTPS=false
else
  echo "Running against staging"
  HOST=local-development.staging.toptal.net
  PORT=8443
  HTTPS=true
fi

if [[ $HTTPS ]]; then
  yarn --cwd=$ROOT_DIR run generate-certificate
  HTTPS_OPTIONS="--https --ssl-key=$ROOT_DIR/_scripts/ssl/server.pem --ssl-cert=$ROOT_DIR/_scripts/ssl/server.pem"
else
  HTTPS_OPTIONS=""
fi

yarn start-storybook -c $ROOT_DIR/.storybook --host $HOST --port $PORT $HTTPS_OPTIONS "$@"
