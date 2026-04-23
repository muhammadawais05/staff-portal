import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateSalesDraftJobDocument,
  UpdateSalesDraftJobMutation
} from './update-sales-draft-job.staff.gql.types'
import { DRAFT_JOB_FRAGMENT } from '../../../DraftJobSection/data/draft-job-fragment'

export const UPDATE_SALES_DRAFT_JOB: typeof UpdateSalesDraftJobDocument = gql`
  mutation UpdateSalesDraftJob($input: UpdateSalesDraftJobInput!) {
    updateSalesDraftJob(input: $input) {
      notice
      ...MutationResultFragment
      draftJob {
        ...DraftJobFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${DRAFT_JOB_FRAGMENT}
`

export const useUpdateSalesDraftJob = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UpdateSalesDraftJobMutation) => void
  onError?: (error: Error) => void
}) => useMutation(UPDATE_SALES_DRAFT_JOB, { onCompleted, onError })
