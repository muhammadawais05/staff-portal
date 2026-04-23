import {
  ApolloClient,
  gql,
  LENS_CONTEXT
} from '@staff-portal/data-layer-service'
import { isNotNullish } from '@staff-portal/utils'

import { GetAutocompleteEmailsDocument } from './get-autocomplete-emails.lens.gql.types'

export const GET_AUTOCOMPLETE_EMAILS: typeof GetAutocompleteEmailsDocument = gql`
  query GetAutocompleteEmails($term: String!) {
    searchResults: emailAddressAutocomplete(term: $term) {
      text: label
      value: label
    }
  }
`

export const getAutocompleteEmails = async (
  term: string,
  limit: number,
  client: ApolloClient<object>
) => {
  const { data, errors } = await client.query({
    query: GET_AUTOCOMPLETE_EMAILS,
    variables: { term },
    context: {
      type: LENS_CONTEXT
    }
  })

  const users = data?.searchResults?.filter(isNotNullish) || []

  return {
    data: users,
    errors: errors
  }
}
