import { Task, Client, Contact } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import {
  getUsersByEmailsResponse,
  getAllEmailMessagesResponse,
  getRoleLensTokenResponse,
  getNotableNodeResponse,
  getEngagementClientRecipientResponse,
  getTeamsWithEmailTrackingResponse,
  getEmailContactsResponse,
  getLatestEmailMessageResponse,
  getClientContactResponse,
  getQuestionAndAnswersResponse,
  getFeedbackReasonsResponse,
  getApplicationInfoResponse,
  getDepositRefundAllowed
} from '~integration/mocks/responses'
import sharedCardTaskStubs from './shared-card-task-stubs'
import { successMutationMock } from '~integration/mocks/mutations'

type Props = {
  task?: Partial<Task>
  company?: Partial<Client>
  companyContacts?: Partial<Contact[]>
}

const updateCompanyCardTaskStubs = ({
  task,
  company,
  companyContacts
}: Props = {}) => {
  cy.stubGraphQLRequests({
    ...sharedCardTaskStubs({ task, company, companyContacts }),
    GetUsersByEmails: getUsersByEmailsResponse(),
    GetAllEmailMessages: getAllEmailMessagesResponse(),
    GetNotableNode: getNotableNodeResponse(),
    GetRoleLensToken: getRoleLensTokenResponse(),
    GetGeneralEmailContext: getEngagementClientRecipientResponse(),
    GetTeamsWithEmailTracking: getTeamsWithEmailTrackingResponse(),
    GetLatestEmailMessage: getLatestEmailMessageResponse(),
    GetEmailContacts: getEmailContactsResponse(),
    GetClientContact: getClientContactResponse({ companyContacts }),
    GetQuestionAndAnswers: getQuestionAndAnswersResponse(),
    GetFeedbackReasons: getFeedbackReasonsResponse(),
    GetApplicationInfo: getApplicationInfoResponse(),
    GetDepositRefundAllowed: getDepositRefundAllowed(),
    GetLazyOperation: ({ variables }) => {
      const taskId = encodeEntityId('123', 'Task')
      const companyRepresentativeId = encodeEntityId(
        '123',
        'CompanyRepresentative'
      )

      if (variables.nodeId === taskId) {
        return {
          data: {
            node: {
              id: taskId,
              operations: {
                createActivity: enabledOperationMock(),
                __typename: 'TaskOperations'
              },
              __typename: 'Task'
            }
          }
        }
      } else if (variables.nodeId === companyRepresentativeId) {
        return {
          data: {
            node: {
              id: companyRepresentativeId,
              operations: {
                inviteToLoginCompanyRepresentative: enabledOperationMock(),
                __typename: 'CompanyRepresentativeOperations'
              },
              __typename: 'CompanyRepresentative'
            }
          }
        }
      }

      return {
        data: {
          node: {
            id: encodeEntityId('123', 'Client'),
            operations: {
              markClientAsBadLead: enabledOperationMock(),
              resumeClient: enabledOperationMock(),
              pauseClient: enabledOperationMock(),
              rejectClient: enabledOperationMock(),
              blackFlagClient: enabledOperationMock(),
              __typename: 'ClientOperations'
            },
            __typename: 'Client'
          }
        }
      }
    },
    CallContact: {
      data: {
        callContact: successMutationMock({
          externalCallUrl: '/tasks#911',
          __typename: 'CallContactPayload'
        })
      }
    }
  })
}

export default updateCompanyCardTaskStubs
