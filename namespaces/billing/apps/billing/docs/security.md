# Summary

This document describes the security considerations that cover authentication
and authorization, in the context of the `Billing Engine` APIs.

## Authentication

Token-based authentication is used. Currently tokens have no expiration time.

All the API calls (except that which generates a new token, i.e. `sign_in`)
should contain an access token as the following HTTP header:

`Authorization: Bearer e9f627c4yTSkMPJSIFPo1EMTRDuT3bpX_kjDgAGuuo`

{TO-DO} - How to sign-in / create new tokens

### Validating logic

**401 HTTP Unauthorized response** is returned when the token is invalid or is
not provided:

```http
HTTP/1.1 401 Unauthorized
{"errors": [{"detail": "Access denied, invalid token"}]}
```

Extra data is returned in specific situations, when appropiate, to provide more
context.

**403 HTTP Forbidden response** is returned when requested action is not allowed
by abilities configured for the current user.

e.g. For `Timesheets`, with ability `list: false`, the following GraphQL query
requesting an array of `Timesheets`:

```query Timesheets($engagementGid: String!)
  {
    timesheets(engagementGid: $engagementGid) {
      submittedAt
      startDate
      endDate
    }
  }
```

would render a **403 response**.

Similar outcome would apply for all other types of actions, either generic
(create, read, delete, update) or domain-specific (submit, revert, close, …).

#### Partial authorization

At times it could happen that the requesting user has rights to query a root
entity, and maybe some (but not all) of its nested details. e.g. a user can
query data for `Customer`, but not their collection of `Payments`.

**TODO** Define approach for this scenario (i.e. query is requested, that
contains some data points allowed and others that are not).
