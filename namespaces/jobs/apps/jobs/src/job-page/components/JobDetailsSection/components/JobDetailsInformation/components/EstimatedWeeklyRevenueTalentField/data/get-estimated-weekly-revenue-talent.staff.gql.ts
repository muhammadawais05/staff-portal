import { gql, useLazyQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetEstimatedWeeklyRevenueTalentDocument } from './get-estimated-weekly-revenue-talent.staff.gql.types'

export default gql`
  query GetEstimatedWeeklyRevenueTalent($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        estimatedWeeklyRevenueTalent
        operations {
          updateJobEstimatedWeeklyRevenueTalent {
            ...OperationFragment
          }
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`

export const getLazyEstimatedWeeklyRevenueTalent = (jobId: string) => () => {
  const [request, { data, loading, error }] = useLazyQuery(
    GetEstimatedWeeklyRevenueTalentDocument,
    {
      variables: { jobId }
    }
  )

  return {
    request,
    data: data?.node?.estimatedWeeklyRevenueTalent
      ? String(data?.node?.estimatedWeeklyRevenueTalent)
      : undefined,
    error,
    loading
  }
}
