import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

import {
  CreateSalesDraftJobDocument,
  CreateSalesDraftJobMutation
} from './create-sales-draft-job.staff.gql.types'
import { DRAFT_JOB_FRAGMENT } from '../../../DraftJobSection/data/draft-job-fragment'
import { CLIENT_CLAIMING_OPERATIONS_FRAGMENT } from '../../../../data/client-claiming-operations-fragment'

export const CREATE_SALES_DRAFT_JOB: typeof CreateSalesDraftJobDocument = gql`
  mutation CreateSalesDraftJob($input: CreateSalesDraftJobInput!) {
    createSalesDraftJob(input: $input) {
      notice
      ...MutationResultFragment
      client {
        id
        draftJobs {
          nodes {
            ...DraftJobFragment
          }
        }
        operations {
          createSalesDraftJob {
            callable
            messages
          }
          ...ClientClaimingOperationsFragment
        }
        claimer {
          ...StaffUserFragment
        }
        claimerCategory
        accountOwner {
          ...StaffUserFragment
        }
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${DRAFT_JOB_FRAGMENT}
  ${CLIENT_CLAIMING_OPERATIONS_FRAGMENT}
  ${STAFF_USER_FRAGMENT}
`

export const useCreateSalesDraftJob = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CreateSalesDraftJobMutation) => void
  onError?: (error: Error) => void
}) => useMutation(CREATE_SALES_DRAFT_JOB, { onCompleted, onError })
