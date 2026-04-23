import { EngagementStatus } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { interviewMock } from '~integration/mocks/fragments'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getEngagementOperations } from '../../fragments/get-engagement-operations'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  getEditInterviewDetailsOperationResponse,
  getInterviewGoogleEventData
} from '~integration/mocks/responses'

const updateEditInterviewDetailsStubs = () =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      status: EngagementStatus.REVIEWED,
      operations: getEngagementOperations({
        scheduleEngagementActivationStartDate: enabledOperationMock()
      }),
      interview: interviewMock({
        operations: {
          updateInterviewGoogleCalendarEvent: enabledOperationMock()
        }
      })
    }),
    GetLazyOperation: getEditInterviewDetailsOperationResponse(),
    GetInterviewGoogleEventData: getInterviewGoogleEventData(),
    UpdateInterviewGoogleCalendarEvent: {
      data: {
        updateInterviewGoogleCalendarEvent: successMutationMock()
      }
    }
  })

export default updateEditInterviewDetailsStubs
