import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  EmailJobApplicantsDocument,
  EmailJobApplicantsMutation
} from './email-job-applicants.staff.gql.types'

export default gql`
  mutation EmailJobApplicants($input: EmailJobApplicantsInput!) {
    emailJobApplicants(input: $input) {
      ...MutationResultFragment
      successCount
      failureCount
      failureMessage
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useEmailJobApplicants = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: EmailJobApplicantsMutation) => void
  onError: () => void
}) => useMutation(EmailJobApplicantsDocument, { onCompleted, onError })
