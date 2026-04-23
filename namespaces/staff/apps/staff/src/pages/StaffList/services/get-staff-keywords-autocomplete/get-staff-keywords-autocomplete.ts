import { ApolloClient } from '@staff-portal/data-layer-service'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { GetStaffAutocompleteDocument } from '../../data/get-staff-autocomplete/get-staff-autocomplete.staff.gql.types'

const getStaffKeywordsAutocomplete = async (
  term: string,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  client: ApolloClient<object>
) => {
  const { data, ...options } = await client.query({
    query: GetStaffAutocompleteDocument,
    variables: {
      term,
      limit,
      offset: 0,
      model: AutocompleteModels.STAFF_SEARCH_KEYWORDS
    },
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.autocomplete.edges,
    ...options
  }
}

export default getStaffKeywordsAutocomplete
