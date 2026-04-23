import { useCallback } from 'react'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetReferrerDocument } from './get-referrer.staff.gql.types'

export const GET_REFERRER: typeof GetReferrerDocument = gql`
  query GetReferrer($id: ID!) {
    staffNode(id: $id) {
      ... on Client {
        id
        fullName
      }
      ... on Role {
        id
        fullName
      }
    }
  }
`

export const useGetReferer = ({
  onCompleted
}: { onCompleted?: () => void } = {}) => {
  const [fetch, { data, ...restOptions }] = useLazyQuery(GET_REFERRER, {
    onCompleted
  })

  const getReferrer = useCallback(
    (id: string) => fetch({ variables: { id } }),
    [fetch]
  )

  return {
    referrer: data?.staffNode,
    getReferrer,
    ...restOptions
  }
}
