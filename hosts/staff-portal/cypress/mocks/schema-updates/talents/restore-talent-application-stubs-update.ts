import { Talent, TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

const updateRestoreTalentApplicationStubs = (talent: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        restoreTalentActivation: enabledOperationMock()
      })
    }),
    GetTalentRejectForInactivity: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          cumulativeStatus: TalentCumulativeStatus.APPLIED,
          ofacStatus: 'NORMAL',
          inactivityRejectionDeadlines: {
            nodes: [],
            __typename: 'TalentInactivityRejectionDeadlineConnection'
          },
          activation: null,
          specializationApplications: {
            nodes: [],
            __typename: 'SpecializationApplicationConnection'
          },
          operations: {
            changeTalentActivationDeadline: hiddenOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    GetResumeTalentApplicationDetails: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          vertical: {
            id: encodeEntityId('123', 'Vertical'),
            specializations: {
              nodes: [
                {
                  id: encodeEntityId('123', 'Specialization'),
                  title: 'Artificial Intelligence',
                  __typename: 'Specialization'
                }
              ],
              __typename: 'VerticalSpecializationConnection'
            },
            __typename: 'Vertical'
          },
          applicationManualRestorationAvailable: true,
          specializationApplications: {
            nodes: [
              {
                id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xMzI1NTY',
                specialization: {
                  id: encodeEntityId('123', 'Specialization'),
                  title: 'Core',
                  __typename: 'Specialization'
                },
                __typename: 'SpecializationApplication'
              }
            ],
            __typename: 'SpecializationApplicationConnection'
          },
          __typename: 'Talent'
        }
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: {
            restoreTalentActivation: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    RestoreTalentActivation: {
      data: {
        restoreTalentActivation: {
          nextAction: null,
          emailTemplate: null,
          ...successOperationMock(),
          __typename: 'ResumeTalentApplicationPayload'
        }
      }
    }
  })

export default updateRestoreTalentApplicationStubs
