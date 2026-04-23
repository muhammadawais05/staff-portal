import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { talentApplicantsPageStub } from '~integration/mocks/request-stubs'
import { getTalentOperations } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'
import { successOperationMock } from '~integration/mocks/operations'

interface Props {
  applicationManualRestorationAvailable?: boolean
  talent?: Partial<Talent>
}

const updateResumeTalentApplicationStubsForTalentApplicantsPage = ({
  applicationManualRestorationAvailable,
  talent
}: Props) =>
  cy.stubGraphQLRequests({
    ...talentApplicantsPageStub({
      ...talent,
      operations: getTalentOperations({
        resumeTalent: enabledOperationMock()
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
            resumeTalent: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    ResumeTalent: {
      data: {
        resumeTalent: {
          nextAction: null,
          emailTemplate: null,
          ...successOperationMock(),
          __typename: 'ResumeTalentApplicationPayload'
        }
      }
    }
  })

export default updateResumeTalentApplicationStubsForTalentApplicantsPage
