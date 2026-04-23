import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import pluralize from 'pluralize'

import {
  GetUserVerticalsDocument,
  GetUserVerticalsQueryVariables
} from './get-user-verticals.staff.gql.types'

export default gql`
  query GetUserVerticals($filter: VerticalsFilter) {
    verticals(filter: $filter, order: { field: NAME, direction: ASC }) {
      nodes {
        ...UserVerticalFragment
      }
    }
  }

  fragment UserVerticalFragment on Vertical {
    id
    talentType
    name
    specializations {
      totalCount
    }
  }
`

export const useGetUserVerticals = ({
  variables,
  onError,
  skip,
  optionsValueKey = 'id'
}: {
  variables?: GetUserVerticalsQueryVariables
  onError?: (error: Error) => void
  skip?: boolean
  optionsValueKey?: 'id' | 'talentType'
} = {}) => {
  const { data, ...restOptions } = useQuery(GetUserVerticalsDocument, {
    variables,
    fetchPolicy: 'cache-first',
    onError,
    skip
  })

  const nodes = data?.verticals?.nodes

  const options = useMemo(
    () =>
      (nodes || []).map(vertical => ({
        text: pluralize(vertical.name),
        value: vertical[optionsValueKey]
      })),
    [nodes, optionsValueKey]
  )

  return { data: nodes, options, ...restOptions }
}
