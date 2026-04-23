import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetReferrerDocument } from './get-referrer.staff.gql.types'

export default gql`
  query GetReferrer($referrerId: ID!) {
    staffNode(id: $referrerId) {
      ... on Role {
        id
        fullName
      }
    }
  }
`
export const useGetReferrer = (referrerId?: string) => {
  const { data, loading } = useQuery(GetReferrerDocument, {
    variables: { referrerId },
    skip: !referrerId
  })

  return {
    referrer: data?.staffNode,
    loading
  }
}
