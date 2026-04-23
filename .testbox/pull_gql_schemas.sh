#!/bin/bash

# Secret provided by docker builder in path /root/gcloud can come in two formats:
# - for local users it's a tar.gz archive of their ~/.config/gcloud directory holding auth data
# - for CI it's a JSON key file required to authenticate gcould with a service account
# This script detects if provided secret is a tar or json and authenticates gcloud accordingly

# Check if provided secret is a valid tar archive. If so GCLOUD_TAR_EXIT_CODE will be 0.
tar --list -f /root/gcloud > /dev/null 2>&1
GCLOUD_TAR_EXIT_CODE=$?
if [ "$GCLOUD_TAR_EXIT_CODE" -eq "0" ]; then
  mkdir -p -m 0600 /config/gcloud
  tar zxf /root/gcloud -C /config/gcloud
  export CLOUDSDK_CONFIG=/config/gcloud
else
  gcloud auth activate-service-account --key-file /root/gcloud
fi

# Before this point we need to play around with exit codes, from this point on any failing
# command should cause the script to fail
set -e

mkdir /tmp-graphql
gsutil cp "gs://gqlgw-introspection/${GQL_SCHEMA_VERSION_PREFIX:-staging}_staff_schema.graphql" /tmp-graphql/gateway_schema.graphql
gsutil cp "gs://gqlgw-introspection/${GQL_SCHEMA_VERSION_PREFIX:-staging}_lens_schema.graphql" /tmp-graphql/lens_schema.graphql

rm -rf /config/gcloud
