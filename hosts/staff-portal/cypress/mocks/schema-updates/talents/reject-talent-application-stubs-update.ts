import {
  SpecializationApplicationOperations,
  TalentStatusV2
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import talentSpecializationApplicationsMock from '~integration/mocks/talent-specialization-applications-mock'

const updateRejectTalentApplicationStubs = () =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talentSpecializationApplicationsMock({
        specializationApplication: {
          operations: {
            rejectSpecializationApplication: enabledOperationMock()
          } as unknown as SpecializationApplicationOperations
        }
      })
    }),
    GetRejectApplicationData: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          status: TalentStatusV2.IN_ONBOARDING,
          fullName: 'Ray Bergstrom',
          specializationApplications: {
            nodes: [
              {
                id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xMjE5ODQy',
                specialization: null,
                rejectNoteTasks: {
                  totalCount: 0,
                  __typename: 'RejectNoteTaskConnection'
                },
                __typename: 'SpecializationApplication'
              }
            ],
            __typename: 'SpecializationApplicationConnection'
          },
          cancelableMeetings: {
            nodes: [],
            __typename: 'MeetingConnection'
          },
          __typename: 'Talent'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xMjE5ODQy',
          operations: {
            rejectSpecializationApplication: enabledOperationMock(),
            __typename: 'SpecializationApplicationOperations'
          },
          __typename: 'SpecializationApplication'
        }
      }
    }
  })

export default updateRejectTalentApplicationStubs
