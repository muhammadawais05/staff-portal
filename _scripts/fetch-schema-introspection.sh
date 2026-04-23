#!/bin/bash

set -e

SCHEMA_LOCATION=$1

if [[ -z "$SCHEMA_LOCATION" ]]
then
  SCHEMA_LOCATION="https://staging.toptal.net/gateway/graphql/staff/graphql"
fi

yarn exec get-graphql-schema $SCHEMA_LOCATION > tmp-graphql/gateway_schema.graphql
