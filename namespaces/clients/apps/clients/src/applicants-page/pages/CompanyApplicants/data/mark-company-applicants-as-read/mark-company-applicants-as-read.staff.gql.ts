import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  MarkCompanyApplicantsAsReadDocument,
  MarkCompanyApplicantsAsReadMutation
} from './mark-company-applicants-as-read.staff.gql.types'

export const MARK_COMPANY_APPLICANTS_AS_READ: typeof MarkCompanyApplicantsAsReadDocument = gql`
  mutation MarkCompanyApplicantsAsRead {
    touchCounter(input: { counterName: "company_applicants" }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useMarkCompanyApplicantsAsRead = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: MarkCompanyApplicantsAsReadMutation) => void
  onError?: () => void
}) =>
  useMutation(MARK_COMPANY_APPLICANTS_AS_READ, {
    onCompleted,
    onError
  })
