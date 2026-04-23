import { ApolloClient } from '@staff-portal/data-layer-service'
import { GetClientAutocompleteDocument } from '@staff-portal/clients'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

export const getClientsKeyWordsAutocomplete = async (
  term: string,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GetClientAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0,
      model: AutocompleteModels.COMPANIES_KEYWORDS
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}
