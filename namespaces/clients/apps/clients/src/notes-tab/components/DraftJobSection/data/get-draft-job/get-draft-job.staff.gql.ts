import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { DRAFT_JOB_FRAGMENT } from '../draft-job-fragment'
import { DEFAULT_DRAFT_JOB_FRAGMENT } from '../default-draft-job-fragment'
import { GetDraftJobDocument } from './get-draft-job.staff.gql.types'

export const GET_DRAFT_JOB = gql`
  query GetDraftJob($clientId: ID!) {
    staffNode(id: $clientId) {
      ... on Client {
        id
        claimer {
          id
        }
        draftJobs {
          nodes {
            ...DraftJobFragment
          }
        }
        defaultDraftJob {
          ...DefaultDraftJobFragment
        }
        operations {
          createSalesDraftJob {
            ...OperationFragment
          }
          approveClient {
            ...OperationFragment
          }
          logClientSalesCall {
            ...OperationFragment
          }
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
  ${DRAFT_JOB_FRAGMENT}
  ${DEFAULT_DRAFT_JOB_FRAGMENT}
`

export const useGetDraftJob = (clientId: string) => {
  const { data, ...rest } = useQuery(GetDraftJobDocument, {
    variables: { clientId }
  })

  const company = data?.staffNode

  return { company, ...rest }
}
