import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetJobsForInvestigationDocument } from './get-jobs-for-investigation.staff.gql.types'
import { INVESTIGATION_JOB_FRAGMENT } from './investigation-job-fragment.staff.gql'

export default gql`
  query GetJobsForInvestigation($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        jobs {
          totalCount
          nodes {
            ...InvestigationJobFragment
          }
        }
      }
    }
  }

  ${INVESTIGATION_JOB_FRAGMENT}
`

export const useGetJobsForInvestigation = (companyId: string) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetJobsForInvestigationDocument
  )({ clientId: companyId })

  return { loading, initialLoading, refetch, data }
}
