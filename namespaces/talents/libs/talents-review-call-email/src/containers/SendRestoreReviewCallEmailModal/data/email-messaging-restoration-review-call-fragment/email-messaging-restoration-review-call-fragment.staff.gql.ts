import { gql } from '@staff-portal/data-layer-service'

import { EMAIL_MESSAGING_ACTIVATION_STEP_FRAGMENT } from '../../../../data/email-messaging-fragment/email-messaging-fragment.staff.gql'

export const EMAIL_MESSAGING_RESTORATION_REVIEW_CALL_FRAGMENT = gql`
  fragment EmailMessagingRestorationReviewCallFragment on ActivationStep {
    id
    type
    emailMessagingRestoration {
      id
      ...EmailMessagingActivationStepFragment
    }
  }

  ${EMAIL_MESSAGING_ACTIVATION_STEP_FRAGMENT}
`
