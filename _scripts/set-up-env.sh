#!/bin/bash
set -e

# Terminal text styles
NO_COLOR='\033[0m'
RED='\033[0;31m'
BOLD_RED='\033[1;31m'
BLUE='\033[0;34m'

# Default hostnames and URLs
APP_URL_LOCAL=http://localhost:4015
APP_URL_STAGING=http://local-development.staging.toptal.net:4015
APP_URL_STAGING_SSL=https://local-development.staging.toptal.net:4015
APP_URL_TEMPLOY=https://local-development.toptal.rocks:4015

API_HOST_LOCAL=http://localhost:8082
API_HOST_STAGING=https://staging.toptal.net

#######################################
# Ensure the DAVINCI_API_GATEWAY_URL variable is set to the input argument ($1) on
# the `.env.development.local` file (which the app GQL client relies on)
#######################################
set_api_host_env_var() {
  local envfile='.env.development.local'

  # Escape '/' into '\/' so that the protocol URL segment (e.g. https://) can be parsed by `sed`
  local host=$(echo ${1//\//\\/})

  # Append a blank set statement if none exists
  if [[ $(grep -c '^\s*DAVINCI_API_GATEWAY_URL=' $envfile) -eq 0 ]]; then echo 'DAVINCI_API_GATEWAY_URL=' >> $envfile; fi

  # Replace all set statements with the requested value ($1)
  # The `cmd1 || cmd2` pattern is used as a workaround to incompatible `sed` binaries on MacOS/Linux
  sed -i "s/^\s*DAVINCI_API_GATEWAY_URL=.*/DAVINCI_API_GATEWAY_URL=$host/g" $envfile 2>/dev/null || sed -i '' "s/^\s*DAVINCI_API_GATEWAY_URL=.*/DAVINCI_API_GATEWAY_URL=$host/g" $envfile
}

# Determine hostnames and URLs depending on target environment ($API_ENV)
if [ "$API_ENV" = "LOCAL" ]; then
  APP_URL="$APP_URL_LOCAL"

  set_api_host_env_var "$API_HOST_LOCAL"
elif [ "$API_ENV" = "STAGING" ]; then
  if [ "$HTTPS" = "true" ]; then
    APP_URL="$APP_URL_STAGING_SSL"
  else
    APP_URL="$APP_URL_STAGING"
  fi

  set_api_host_env_var "$API_HOST_STAGING"
elif [ "$API_ENV" = "TEMPLOY" ]; then
  if [ "$API_HOST" = "" ]; then
    echo -e "${RED}\nNo API_HOST variable found. For TEMPLOY, you need to set API_HOST to the hostname of the temploy instance, without protocol or slashes, e.g.:\n${BOLD_RED}platform-123-ticket-456-my-feature.toptal.rocks.\n"
    exit 1
  fi
  APP_URL="$APP_URL_TEMPLOY"

  set_api_host_env_var "https://$API_HOST"
else
  echo -e "${RED}No API_ENV variable found. Accepted values are: LOCAL, STAGING, TEMPLOY."
  exit 1
fi

echo -e "${NO_COLOR}\nServer environment is set to ${BLUE}${API_ENV}${NO_COLOR}."

export PORT=${APP_URL##*:}
HOST_WITH_PORT=${APP_URL#*//}
export HOST=${HOST_WITH_PORT/:$PORT/}

# Presets the JWT_TOKEN variable and runs the cmd. passed as input argument(s)
JWT_TOKEN=${JWT_TOKEN} exec "$@"
