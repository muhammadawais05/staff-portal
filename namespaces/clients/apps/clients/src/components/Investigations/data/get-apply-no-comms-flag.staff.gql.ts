import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetApplyNoCommsFlagDocument } from './get-apply-no-comms-flag.staff.gql.types'

export const GET_APPLY_NO_COMMS_FLAG = gql`
  query GetApplyNoCommsFlag($id: ID!) {
    node(id: $id) {
      ... on Client {
        id
        roleFlags {
          nodes {
            id
            flag {
              id
              token
            }
          }
        }
      }
    }
  }
`

const NO_COMMS_TOKEN_KEY = 'no_comms'

export const useGetApplyNoCommsFlag = (id: string) => {
  const { data, error, loading, initialLoading } = useQuery(
    GetApplyNoCommsFlagDocument,
    {
      variables: { id }
    }
  )

  return {
    data: {
      hasNoCommsTokenKey: data?.node?.roleFlags?.nodes.some(
        ({ flag: { token } }) => token === NO_COMMS_TOKEN_KEY
      )
    },
    initialLoading,
    loading,
    error
  }
}
