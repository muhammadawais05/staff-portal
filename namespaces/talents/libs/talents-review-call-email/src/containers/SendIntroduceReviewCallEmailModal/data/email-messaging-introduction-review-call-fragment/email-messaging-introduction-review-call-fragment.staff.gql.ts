import { gql } from '@staff-portal/data-layer-service'

import { EMAIL_MESSAGING_ACTIVATION_STEP_FRAGMENT } from '../../../../data/email-messaging-fragment/email-messaging-fragment.staff.gql'

export const EMAIL_MESSAGING_INTRODUCTION_REVIEW_CALL_FRAGMENT = gql`
  fragment EmailMessagingIntroductionReviewCallFragment on ActivationStep {
    id
    type
    emailMessagingIntroduction {
      id
      ...EmailMessagingActivationStepFragment
    }
  }

  ${EMAIL_MESSAGING_ACTIVATION_STEP_FRAGMENT}
`
