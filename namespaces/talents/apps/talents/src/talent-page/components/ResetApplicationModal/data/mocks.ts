import { createMutationMocks } from '@staff-portal/test-utils'

import {
  ResetRejectedTalentApplicationMutation,
  ResetRejectedTalentApplicationMutationVariables
} from './reset-rejected-talent-application.staff.gql.types'
import { RESET_REJECTED_TALENT_APPLICATION } from './reset-rejected-talent-application.staff.gql'

export const {
  success: createResetRejectTalentApplicationMock,
  failed: createResetRejectTalentApplicationFailedMock,
  invalid: createResetRejectTalentApplicationInvalidMock
} = createMutationMocks<
  ResetRejectedTalentApplicationMutationVariables['input'],
  ResetRejectedTalentApplicationMutation
>({
  options: {
    query: RESET_REJECTED_TALENT_APPLICATION,
    key: 'resetRejectedTalentApplication',
    keyTypename: 'ResetRejectedTalentApplicationPayload'
  },
  successOptions: {
    additionalResponse: {
      emailTemplate: {
        id: 'email-template-id',
        __typename: 'EmailTemplate'
      }
    }
  }
})
