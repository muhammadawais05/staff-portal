import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetStepClaimersDocument } from './get-step-claimers.staff.gql.types'

export default gql`
  query GetStepClaimers($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        step {
          id
          possibleClaimers {
            nodes {
              id
              fullName
            }
          }
        }
      }
    }
  }
`

export const useGetStepClaimers = (
  roleStepId: string,
  { onCompleted }: Partial<{ onCompleted?: () => void }> = {}
) => {
  const { data, error, ...restOptions } = useQuery(GetStepClaimersDocument, {
    variables: { roleStepId },
    onCompleted
  })

  if (error && !data) {
    throw error
  }

  const claimers = useMemo(
    () => data?.node?.step.possibleClaimers?.nodes || [],
    [data]
  )

  return {
    claimers,
    error,
    ...restOptions
  }
}
