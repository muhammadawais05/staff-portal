import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ApproveCommitmentChangeRequestDocument } from './approve-commitment-change-request.staff.gql.types'

export default gql`
  mutation ApproveCommitmentChangeRequest(
    $input: ApproveCommitmentChangeRequestInput!
  ) {
    approveCommitmentChangeRequest(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useApproveCommitmentChangeRequest = () =>
  useMutation(ApproveCommitmentChangeRequestDocument)
