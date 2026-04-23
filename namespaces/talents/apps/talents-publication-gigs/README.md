# Requests Module

This module implements functionality to match p2p requests between talents

## Setup local development

This section describes the steps need to run rti-platform with local projects

### Setup platform

1. navigate to `platform`
2. start services by running `bin/up development` (or without_billing)
3. run `bin/setup -g` to load the graphql schema dump
4. run `foreman start`

### Setup RTI

- Checkout and setup `rti-platform` as described in the readme
  [here](https://github.com/toptal/rti-platform)
- navigate to `rti-platform`
- generate, push and activate the schema
  - talent GraphQL schema: `rails p2p:graphql:talent_schema`.
  - staff GraphQL schema: `rails p2p:graphql:staff_schema`.
  - push and activate schemas in GQL Gateway:
    `rails graphql:gateway:push graphql:gateway:activate`.

#### Consume in staff portal

- navigate to `staff-portal`
- temporarily replace the endpoint in the script `fetch:graphql-gateway-schema`
  to `http://127.0.0.1:8082/gateway/graphql/staff/graphql`
- run `yarn start:local`
