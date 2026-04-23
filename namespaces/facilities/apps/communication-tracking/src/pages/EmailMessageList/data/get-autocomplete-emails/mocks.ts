import { GET_AUTOCOMPLETE_EMAILS } from './get-autocomplete-emails.lens.gql'

export const createAutocompleteEmailMock = ({
  term,
  userEmail
}: {
  term: string
  userEmail?: string
}) => ({
  request: {
    query: GET_AUTOCOMPLETE_EMAILS,
    variables: { term }
  },
  result: {
    data: {
      searchResults: userEmail
        ? [
            {
              __typename: 'AutocompleteResult',
              text: userEmail,
              value: userEmail
            }
          ]
        : []
    }
  }
})

export const createAutocompleteEmailErrorMock = ({
  userEmail,
  errorMessage
}: {
  userEmail: string
  errorMessage?: string
}) => ({
  request: {
    query: GET_AUTOCOMPLETE_EMAILS,
    variables: { term: userEmail }
  },
  error: new Error(errorMessage)
})
