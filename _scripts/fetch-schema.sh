#!/bin/bash

set -e

SCHEMA_TYPE=$1
SCHEMA_ENVIRONMENT=$2

if [[ -z "$SCHEMA_TYPE" ]]
then
  echo "SCHEMA_TYPE is not specified (first argument of the script) - needs to be 'staff' or 'lens'"
  exit 1
fi

if [[
  -z "$SCHEMA_ENVIRONMENT" ||
  ("$SCHEMA_TYPE" == "lens" && "$SCHEMA_ENVIRONMENT" == "development")
]]
then
  SCHEMA_ENVIRONMENT="staging"
fi

if [[ "$SCHEMA_TYPE" != "staff" && "$SCHEMA_TYPE" != "lens" ]]
then
  echo "Unsupported SCHEMA_TYPE value '$SCHEMA_TYPE' - needs to be 'staff' or 'lens'"
  exit 1
fi

if [[
  "$SCHEMA_ENVIRONMENT" != "development" &&
  "$SCHEMA_ENVIRONMENT" != "staging" &&
  "$SCHEMA_ENVIRONMENT" != "production"
]]
then
  echo "Unsupported SCHEMA_ENVIRONMENT value '${SCHEMA_ENVIRONMENT}' - needs to be 'development', 'staging', or 'production'"
  exit 1
fi

if [[ "$SCHEMA_TYPE" == 'staff' ]]
then
  SCHEMA_NAME='gateway'
else
  SCHEMA_NAME='lens'
fi

SCHEMA_LOCATION="gs://gqlgw-introspection/${SCHEMA_ENVIRONMENT}_${SCHEMA_TYPE}_schema.graphql"
SCHEMA_TYPE_UPPERCASE=$(echo "${SCHEMA_TYPE}" | tr '[a-z]' '[A-Z]')

gsutil cp "${SCHEMA_LOCATION}" tmp-graphql/${SCHEMA_NAME}_schema.graphql

echo "${SCHEMA_TYPE_UPPERCASE} ${SCHEMA_ENVIRONMENT} schema successfully downloaded"
