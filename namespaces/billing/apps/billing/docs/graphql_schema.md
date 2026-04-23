# GraphQL Schema fetch and types generation

As you probably know already, GraphQL is a typed system and describes how data
can be retrieved or modified (more [here](https://graphql.org/learn/schema/)).

This document describes how to retrieve the introspection schema from our
backend server, and how to autogenerate Typescript types based on it.

## Prerequisites

The `fetch:graphql-(...)-from-bucket(-...)` scripts are using `gsutil` to
download the schema from a Google Cloud bucket, so you'll need to have the
**Google Cloud SDK** configured locally on your machine. Installation
instructions:
<https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/2200436828/Accessing+latest+GraphQL+Gateway+schema+dump#Accessing-the-GCP-bucket-from-the-CLI>

## How to fetch the GraphQL schema from a backend server

This can be easily done by setting the `GQL_GATEWAY_API_ENDPOINT` env. variable
& running the `generate:types` script i.e.

- from the staging server (`GQL_GATEWAY_API_ENDPOINT` defaults to staging, when
  ommited)

```sh
GQL_GATEWAY_API_ENDPOINT='https://staging.toptal.net/gateway/graphql/staff/graphql' yarn generate:types
```

- from a local server (i.e. developing with a local platform stack):

```sh
GQL_GATEWAY_API_ENDPOINT='http://localhost:8082/gateway/graphql/staff/graphql' yarn generate:types
```

- from a temploy server

```sh
GQL_GATEWAY_API_ENDPOINT='https://my.temploy.toptal-rocks/gateway/graphql/staff/graphql' yarn generate:types
```

## How to regenerate types only

If you have added or modified query/mutation files (\*.graphql.ts), then you can
just run the following command to generate their strong types, without fetching
the latest schema:

```sh
yarn generate:types:from-local-schema
```
