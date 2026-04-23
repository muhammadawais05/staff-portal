import { useMemo } from 'react'
import { BATCH_KEY, gql, useQuery } from '@staff-portal/data-layer-service'
import { compareAlphabetically } from '@staff-portal/string'

import { CLIENT_MATCHERS_BATCH_KEY } from '../config'
import { GetVerticalsWithMatchersDocument } from './get-verticals-with-matchers.staff.gql.types'

export default gql`
  query GetVerticalsWithMatchers($filter: VerticalsFilter) {
    verticals(filter: $filter, order: { field: NAME, direction: ASC }) {
      nodes {
        id
        name
        talentType
        clientMatchers {
          nodes {
            id
            fullName
          }
        }
      }
    }
  }
`

export const useGetVerticalsWithMatchers = ({
  onError,
  skip
}: {
  onError?: (error: Error) => void
  skip?: boolean
} = {}) => {
  const { data, ...restOptions } = useQuery(GetVerticalsWithMatchersDocument, {
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        withPseudo: false
      }
    },
    context: { [BATCH_KEY]: CLIENT_MATCHERS_BATCH_KEY },
    onError,
    skip
  })

  const verticals = data?.verticals.nodes

  const options = useMemo(
    () =>
      (verticals || []).map(vertical => ({
        ...vertical,
        clientMatchers: vertical.clientMatchers.nodes
          .map(matcher => ({
            label: matcher.fullName,
            value: matcher.id
          }))
          .sort((first, second) =>
            compareAlphabetically(first.label, second.label)
          )
      })),
    [verticals]
  )

  return { options, ...restOptions }
}
