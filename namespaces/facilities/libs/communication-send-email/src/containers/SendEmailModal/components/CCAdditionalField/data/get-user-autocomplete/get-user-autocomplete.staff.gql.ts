import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import {
  ApolloClient,
  gql,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import { GetUserAutocompleteDocument } from './get-user-autocomplete.staff.gql.types'

export const GET_USER_AUTOCOMPLETE: typeof GetUserAutocompleteDocument = gql`
  query GetUserAutocomplete(
    $filter: AutocompleteFilter!
    $pagination: OffsetPagination!
  ) {
    autocomplete(filter: $filter, pagination: $pagination) {
      nodes {
        ...AutocompleteRoleFragment
        ...AutocompleteClientFragment
      }
      totalCount
    }
  }

  fragment AutocompleteRoleFragment on Role {
    id
    userLegacyId
    type
    email
    fullName
    photo {
      thumb
    }
    contacts(filter: { type: [EMAIL] }) {
      nodes {
        id
        value
      }
    }
  }

  fragment AutocompleteClientFragment on Client {
    id
    userLegacyId
    type
    email
    fullName
    photo {
      thumb
    }
    representatives {
      nodes {
        id
        contacts(filter: { type: EMAIL }) {
          nodes {
            id
            value
          }
        }
      }
    }
  }
`

export type Options = {
  model: AutocompleteModels
  limit?: number
  onError?: () => void
  errors?: Error[]
}

export const useGetUserAutocomplete = ({
  model,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
}: Options) => {
  const [fetch, { data, loading }] = useLazyQuery(GET_USER_AUTOCOMPLETE, {
    fetchPolicy: 'cache-first'
  })

  const getUsers = (term = '') =>
    fetch({
      variables: {
        filter: { model, term },
        pagination: { limit, offset: 0 }
      }
    })

  return {
    loading,
    getUsers,
    data: data?.autocomplete.nodes
  }
}

export const getUserAutocomplete =
  ({ model }: Options) =>
  async (
    term: string,
    limit: number = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    client: ApolloClient<object>
  ) => {
    const { data, errors } = await client.query({
      query: GET_USER_AUTOCOMPLETE,
      variables: {
        filter: { model, term },
        pagination: { limit, offset: 0 }
      }
    })

    const users = data?.autocomplete.nodes

    return {
      data: users,
      errors
    }
  }
