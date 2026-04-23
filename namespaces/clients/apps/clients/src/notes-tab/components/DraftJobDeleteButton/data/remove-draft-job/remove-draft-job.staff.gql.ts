import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RemoveSalesDraftJobDocument } from './remove-draft-job.staff.gql.types'

export const REMOVE_DRAFT_JOB: typeof RemoveSalesDraftJobDocument = gql`
  mutation RemoveSalesDraftJob($input: RemoveSalesDraftJobInput!) {
    removeSalesDraftJob(input: $input) {
      notice
      ...MutationResultFragment

      client {
        id
        draftJobs {
          nodes {
            id
          }
        }
        operations {
          createSalesDraftJob {
            ...OperationFragment
          }
          approveClient {
            ...OperationFragment
          }
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`
