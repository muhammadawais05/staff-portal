import {
  Engagement,
  EngagementStatus,
  JobStatus,
  TalentJobIssue
} from '@staff-portal/graphql/staff'

import { jobOperationsMock } from '~integration/mocks/fragments/job-operations-mock'
import { jobPageStubs } from '../../request-stubs'
import {
  getEmailContactsResponse,
  getEmailMessagingEngagementResponse,
  getEngagementTalentRecipientResponse,
  getJobCandidatesEngagementResponse,
  getJobPageCandidatesResponse,
  getTeamsWithEmailTrackingResponse
} from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'
import { getEngagementMock } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'

const updateCandidateEmailActionsStubs = (addressee: string) => {
  const engagement = {
    status: EngagementStatus.PENDING,
    clientEmailMessaging: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdFbmdhZ2VtZW50Q2xpZW50LTI5MTI1Nw',
      operations: {
        sendEmailTo: enabledOperationMock(),
        __typename: 'EmailMessagingOperation'
      },
      __typename: 'EmailMessagingEngagementClient'
    },
    talentEmailMessaging: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdFbmdhZ2VtZW50VGFsZW50LTI5MTI1Nw',
      operations: {
        sendEmailTo: enabledOperationMock(),
        __typename: 'EmailMessagingOperation'
      },
      __typename: 'EmailMessagingEngagementTalent'
    }
  }

  cy.stubGraphQLRequests({
    ...jobPageStubs({
      status: JobStatus.ACTIVE,
      operations: jobOperationsMock()
    }),
    GetJobPageCandidates: getJobPageCandidatesResponse({}, [
      {
        jobIssues: { failedMetrics: [], status: TalentJobIssue.OK },
        node: getEngagementMock(engagement) as Engagement
      }
    ]),
    GetEngagement: getJobCandidatesEngagementResponse(engagement),
    GetLazyOperation: getEmailMessagingEngagementResponse(addressee),
    GetGeneralEmailContext: getEngagementTalentRecipientResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    SendEmail: {
      data: {
        sendEmailTo: successMutationMock()
      }
    }
  })
}

export default updateCandidateEmailActionsStubs
