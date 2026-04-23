import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'

interface Props {
  applicationManualRestorationAvailable?: boolean
  talent?: Partial<Talent>
}

const updateResumeTalentApplicationStubs = ({
  applicationManualRestorationAvailable,
  talent
}: Props) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        resumeTalentApplication: enabledOperationMock()
      })
    }),
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
          applicationManualRestorationAvailable:
            applicationManualRestorationAvailable,
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
            resumeTalentApplication: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    ResumeTalentApplication: {
      data: {
        resumeTalentApplication: {
          nextAction: null,
          emailTemplate: null,
          ...successOperationMock(),
          __typename: 'ResumeTalentApplicationPayload'
        }
      }
    }
  })

export default updateResumeTalentApplicationStubs
