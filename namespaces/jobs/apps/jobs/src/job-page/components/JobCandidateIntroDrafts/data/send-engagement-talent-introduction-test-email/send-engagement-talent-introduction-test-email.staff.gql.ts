import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { SendEngagementTalentIntroductionTestEmailDocument } from './send-engagement-talent-introduction-test-email.staff.gql.types'

export const SEND_ENGAGEMENT_TALENT_INTRODUCTION_TEST_EMAIL = gql`
  mutation SendEngagementTalentIntroductionTestEmail(
    $input: SendEngagementTalentIntroductionTestEmailInput!
  ) {
    sendEngagementTalentIntroductionTestEmail(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useSendEngagementTalentIntroductionTestEmail = () =>
  useMutation(SendEngagementTalentIntroductionTestEmailDocument)
