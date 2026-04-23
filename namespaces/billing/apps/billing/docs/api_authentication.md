# API authentication for local development

## Billing services endpoints

`billing` and `billingDocuments` _Extracted billing related services, direct GQL
endpoint access_

### Regenerating JWT token for development purposes

The following commands should be run in Rails console of the platform project.
_(`rails c`)_

#### In case of Staff

```bash
[1] pry(main)> Billing::Helper.auth_token(Engagement.find(${ENGAGEMENT_ID}).job.claimer)
```

#### In case of Talent

```bash
[1] pry(main)> Billing::Helper.auth_token(Engagement.find(${ENGAGEMENT_ID}).talent)
```

## `Talent` endpoint

### Relevant documents

1. [Client Portal's basic description of GraphQL API](https://github.com/toptal/platform/tree/master/api#normal-way---using-portal--apollo-plugin)
2. [Talent Portal's description of generating a `talent` endpoint token](https://github.com/toptal/talent-portal-frontend/blob/master/docs/graphql_schema_and_types.md#updating-schema)

## `Staff` endpoint

Authentication is based on cookies. To refresh a cookie, log in to platform
locally, as any admin user and copy the content of the cookie which name starts
with `_toptal_session_id`.
