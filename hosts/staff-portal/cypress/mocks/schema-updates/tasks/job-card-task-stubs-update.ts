import { Subject, JobOperations } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  getApproveJobDetailsResponse,
  getEmailContactsResponse,
  getEngagementTalentRecipientResponse,
  getFeedbackReasonsResponse,
  getJobDeleteDetailsResponse,
  getJobResponse,
  getLatestEmailMessageResponse,
  getTalentMatchersResponse,
  getTeamsWithEmailTrackingResponse,
  getUsersByEmailsResponse
} from '~integration/mocks/responses'
import sharedCardTaskStubs from './shared-card-task-stubs'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

type Props = {
  subjects?: Partial<Subject[]>
  jobOperations?: Partial<JobOperations>
}

const updateJobCardTaskStubs = ({ subjects, jobOperations }: Props = {}) => {
  cy.stubGraphQLRequests({
    ...sharedCardTaskStubs({ subjects }),
    GetJob: getJobResponse({ jobOperations }),
    GetDeleteJobDetails: getJobDeleteDetailsResponse(),
    GetApproveJobDetails: getApproveJobDetailsResponse(),
    GetTalentMatchers: getTalentMatchersResponse(),
    GetFeedbackReasons: getFeedbackReasonsResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    GetUsersByEmails: getUsersByEmailsResponse(),
    GetGeneralEmailContext: getEngagementTalentRecipientResponse(),
    GetLazyOperation: ({ variables }) => {
      const jobId = encodeEntityId('123', 'Job')
      const emailMessagingEngagementTalentId = encodeEntityId(
        '123',
        'EmailMessagingEngagementTalent'
      )

      if (variables.nodeId === jobId) {
        return {
          data: {
            node: {
              id: jobId,
              operations: {
                approveJob: hiddenOperationMock(),
                removeJob: hiddenOperationMock(),
                resumePostponedJob: hiddenOperationMock(),
                __typename: 'JobOperations',
                ...jobOperations
              },
              __typename: 'Job'
            }
          }
        }
      } else if (variables.nodeId === emailMessagingEngagementTalentId) {
        return {
          data: {
            node: {
              id: emailMessagingEngagementTalentId,
              operations: {
                sendEmailTo: enabledOperationMock(),
                __typename: 'EmailMessagingOperation'
              },
              __typename: 'EmailMessagingEngagementTalent'
            }
          }
        }
      }

      return {
        data: {
          node: {
            id: encodeEntityId('123', 'EmailMessagingEngagementClient'),
            operations: {
              sendEmailTo: enabledOperationMock(),
              __typename: 'EmailMessagingOperation'
            },
            __typename: 'EmailMessagingEngagementClient'
          }
        }
      }
    }
  })
}

export default updateJobCardTaskStubs
