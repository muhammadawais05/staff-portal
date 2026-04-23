# Query Params State

This package abstracts the access to page URL query parameters via special hook.
Consumers of the hook can read and write URL query parameters, optionally
transforming query parameters by configuring the hook in a way described below.

The package solves the following problem - reading and manipulating URL query
parameters from React components. The package is generic by design and is often
used for page filters.

## Package usage

### useQueryParamsState hook

`useQueryParamsState` hook provides a way to read and write page URL query
parameters. The hook abstracts the access to the browser's `window.location`
object and provides access to raw query parameter values, as well as the ability
to encode or decode parameter values.

#### Working with raw query parameter values

Some use cases do not need any transformations for URL query parameters. The
example below demonstrates the case when the URL query part looks like
`?testUrlParameter=abc123`, so the hook consumer accesses the raw parameter
value. Whenever the URL is modified (by hand or by using `Go Back` /
`Go Forward` browser navigation), hook updates the `urlValues` variable and, on
the contrary, when the `setUrlValues()` is called, the URL is updated
accordingly.

Example:

```tsx
import { useQueryParamsState, QueryParams } from '@staff-portal/query-params-state'
interface TestQueryParams extends QueryParams { testUrlParameter?: string }

...

const [urlValues, setUrlValues] = useQueryParamsState<TestQueryParams>()
// Read URL parameters
console.log(`Current URL parameters: ${JSON.stringify(urlValues)}`)
// Write URL parameters
const updateUrlParameter =
  () => setUrlValues({ testUrlParameter: 'Test_URL_parameter_value' })
```

#### Encoding and decoding query parameter values

In some cases, URL parameter values might need certain transformations before
they are passed to the consumer or before the URL is updated. In order to
distinguish the direction of transformation the following definitions are
introduced:

- `encoding` is the process of transforming the programmatically-set parameter
  value into the URL query parameter (from code to URL). This process usually
  does not need any asynchronous actions as it is assumed that the application
  state already contains all the information to properly encode values (encoders
  are synchronous);

- `decoding` is the process of transforming URL parameter value to be used in
  the code (from URL to code). This process may require some asynchronous
  actions, as the application may require additional information about the
  initial value (decoders may be synchronous or asynchronous).

In order to demonstrate the encoding and decoding features of
`useQueryParamsState` the following example is considered - there is an
application page that lists blog posts from all the users. The posts list may
filter posts by author (user).

The user entity has two important fields:

- `id` is the user identifier in the database (posts are filtered using this
  field);
- `legacyId` is a legacy user identifier used only in URL to be compatible with
  legacy system.

The posts list page URL typically looks like `/posts?userId=legacyId123`. The
backend API fetches new posts via `GET /api/posts?userId=id456`. This way, the
`useQueryParamsState` needs to be configured to resolve legacy user identifiers
into regular ones and vice-versa. In order to do this, the encoding and decoding
configuration for every parameter needs to be provided to `useQueryParamsState`
as in the example below:

```tsx
import { useQueryParamsState, QueryParams } from '@staff-portal/query-params-state'
// "userId" comes from the URL parameter name
interface TestQueryParams extends QueryParams { userId?: string }

...

const listOfUsers: User[] = ...
const [urlValues, setUrlValues, loading] = useQueryParamsState<TestQueryParams>({
  userId: {
    // Getting the "legacyId" for the user with
    // specific "id" to set the URL query parameter
    encode: (id: string) => listOfUsers
      .find(({ id: userId }) => userId === id).legacyId
    // Getting the user "id" from asynchronously
    // fetched user with specific "legacyId" from URL
    decode: async (legacyId: string) => {
      const user = await fetchUser({ legacyId })
      return user.id
    }
  }
})

// The "loading" property is true if there is at least one non-completed decoder
if (loading) {
  return ...
}
```

This way, in the example above (assuming that the user has
`{ id: "id456", legacyId: "legacyId123" }` in the database):

- the `urlValues` variable will have the `{ userId: "id456" }` value when the
  URL is `/posts?userId=legacyId123`;
- the URL will be `/posts?userId=legacyId123` after the
  `setUrlValues({ userId: "id456" })` is called.
