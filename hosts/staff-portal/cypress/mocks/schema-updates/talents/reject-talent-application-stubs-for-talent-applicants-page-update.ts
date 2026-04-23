import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TalentStatusV2, Talent } from '@staff-portal/graphql/staff'

import { talentApplicantsPageStub } from '~integration/mocks/request-stubs'
import { enabledOperationMock } from '~integration/mocks'
import { successOperationMock } from '~integration/mocks/operations'

const updateRejectTalentApplicationStubsForTalentApplicantsPage = (
  talent?: Partial<Talent>
) => {
  cy.stubGraphQLRequests({
    ...talentApplicantsPageStub(talent),
    GetRejectApplicationData: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          status: TalentStatusV2.ACTIVE,
          fullName: 'Ray Bergstrom',
          specializationApplications: {
            nodes: [
              {
                id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xMzAzNjYz',
                specialization: null,
                rejectNoteTasks: {
                  totalCount: 1,
                  __typename: 'RejectNoteTaskConnection'
                },
                __typename: 'SpecializationApplication'
              }
            ],
            __typename: 'SpecializationApplicationConnection'
          },
          cancelableMeetings: {
            nodes: [
              {
                id: 'VjEtTWVldGluZy0xMjIxMjc2',
                subject: 'Obfuscated subject for meeting 1221276',
                __typename: 'Meeting'
              }
            ],
            __typename: 'MeetingConnection'
          },
          __typename: 'Talent'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xMzAzNjYz',
          operations: {
            rejectSpecializationApplication: enabledOperationMock(),
            __typename: 'SpecializationApplicationOperations'
          },
          __typename: 'SpecializationApplication'
        }
      }
    },
    RejectSpecializationApplication: {
      data: {
        rejectSpecializationApplication: {
          nextAction: null,
          emailTemplate: null,
          nextActionPerformable: null,
          ...successOperationMock(),
          __typename: 'RejectSpecializationApplicationPayload'
        }
      }
    }
  })
}

export default updateRejectTalentApplicationStubsForTalentApplicantsPage
