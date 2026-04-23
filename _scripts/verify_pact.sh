#!/bin/bash
set -e

docker run --rm \
pactfoundation/pact-cli:latest broker can-i-deploy \
--broker-base-url "$PACT_BROKER_URL" \
--broker-username "$PACT_BROKER_USR" \
--broker-password "$PACT_BROKER_PSW" \
--pacticipant "$1" \
--version "$GIT_COMMIT" \
--to production \
--retry-while-unknown 150
