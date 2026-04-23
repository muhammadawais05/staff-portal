import { MockedResponse } from '@staff-portal/data-layer-service/src'

import CANCEL_SCHEDULED_INTERVIEW_INVITATION from './cancel-scheduled-invitation.staff.gql'
import { CancelScheduledInterviewInvitationMutation } from './cancel-scheduled-invitation.staff.gql.types'

export const createCancelScheduledInterviewInvitationMock = ({
  roleStepId
}: {
  roleStepId: string
}): MockedResponse<CancelScheduledInterviewInvitationMutation> => {
  return {
    request: {
      query: CANCEL_SCHEDULED_INTERVIEW_INVITATION,
      variables: {
        input: { roleStepId }
      }
    },

    result: {
      data: {
        cancelScheduledInterviewInvitation: {
          errors: [],
          success: true
        }
      }
    }
  }
}
