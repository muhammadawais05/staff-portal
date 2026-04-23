import { Engagement } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import {
  getBillingCyclesResponse,
  getBillingCyclesWithTimesheetsResponse,
  getEngagementBreaksResponse,
  getEngagementClientInterviewFeedbackResponse,
  getEngagementClientResponse,
  getEngagementFeedbacksResponse,
  getEngagementInterviewsResponse,
  getEngagementJobDetailsResponse,
  getEngagementProfilePermissionResponse,
  getEngagementResponse,
  getEngagementStatusResponse,
  getEngagementTalentInterviewFeedbackResponse,
  getEngagementTalentResponse,
  getFeedbackReasonsResponse,
  getLatestEngagementSurveyAnswers,
  getPendoVisitorResponse
} from '../responses'
import { successMutationMock } from '~integration/mocks/mutations'

export const engagementPageStubs = (
  engagement?: Partial<Engagement>
): { [key: string]: OperationValue } => ({
  GetEngagementProfilePermission: getEngagementProfilePermissionResponse(),
  GetEngagementClient: getEngagementClientResponse(engagement),
  GetEngagementTalent: getEngagementTalentResponse(engagement),
  GetEngagementBreaks: getEngagementBreaksResponse(engagement),
  GetEngagementJobDetails: getEngagementJobDetailsResponse(engagement),
  GetEngagementStatus: getEngagementStatusResponse(engagement),
  GetEngagementInterviews: getEngagementInterviewsResponse(engagement),
  GetEngagementFeedbacks: getEngagementFeedbacksResponse(engagement),
  GetEngagementClientInterviewFeedback:
    getEngagementClientInterviewFeedbackResponse(engagement),
  GetTalentInterviewFeedback:
    getEngagementTalentInterviewFeedbackResponse(engagement),
  GetBillingCyclesWithTimesheets: getBillingCyclesWithTimesheetsResponse(),
  GetBillingCycles: getBillingCyclesResponse(engagement),
  GetEngagement: getEngagementResponse(engagement),
  GetLatestEngagementSurveyAnswers:
    getLatestEngagementSurveyAnswers(engagement),
  GetFeedbackReasons: getFeedbackReasonsResponse(),
  CallClient: {
    data: {
      callClient: successMutationMock({
        externalCallUrl: '/engagements/911',
        __typename: 'CallContactPayload'
      })
    }
  },
  GetPendoVisitor: getPendoVisitorResponse()
})
