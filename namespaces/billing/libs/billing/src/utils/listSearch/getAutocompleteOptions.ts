import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { QueryAutocompleteDocument } from '../../data'

// TODO: fix typing, temporary switched of because SP has Apollo v2 yet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = any
// type Client = ApolloClient<object>

const MAX_AUTOCOMPLETE_SIZE = 8

export const getAutocompleteOptions =
  (model: AutocompleteModels) =>
    async (
      term: string,
      limit: number = MAX_AUTOCOMPLETE_SIZE,
      client: Client
    ) => {
      const { data, loading } = await client.query({
        query: QueryAutocompleteDocument,
        variables: {
          limit,
          model,
          offset: 0,
          term
        }
      })

      const options = data?.autocomplete?.edges

      return {
        data: options,
        loading
      }
    }

export default getAutocompleteOptions
