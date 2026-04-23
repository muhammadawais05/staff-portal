import { useCallback, useMemo } from 'react'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetAssociationUserAutocompleteDocument,
  GetAssociationUserAutocompleteQuery
} from './get-association-user-autocomplete.staff.gql.types'

export type AssociationAutocompleteUser =
  GetAssociationUserAutocompleteQuery['autocomplete']['edges'][0]

export const GET_ASSOCIATION_USER_AUTOCOMPLETE: typeof GetAssociationUserAutocompleteDocument = gql`
  query GetAssociationUserAutocomplete($term: String!, $limit: Int!) {
    autocomplete(
      filter: { model: USERS, term: $term }
      pagination: { limit: $limit, offset: 0 }
    ) {
      edges {
        key
        label
        labelHighlight
        node {
          id
          ... on WebResource {
            webResource {
              url
            }
          }
        }
        photo {
          thumb
        }
        nodeTypes
      }
      totalCount
    }
  }
`

export const useGetAssociationUserAutocomplete = () => {
  const [fetch, { data, loading }] = useLazyQuery(
    GET_ASSOCIATION_USER_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const getUsers = useCallback(
    (term = '') => {
      fetch({
        variables: {
          limit: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
          term
        }
      })
    },
    [fetch]
  )

  return useMemo(
    () => ({
      loading,
      getUsers,
      data: data?.autocomplete.edges
    }),
    [loading, getUsers, data]
  )
}
