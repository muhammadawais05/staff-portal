import {
  Talent,
  TalentCumulativeStatus,
  VerticalConnection
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'

const updateApplyToDifferentVerticalStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      otherVerticals: {
        nodes: [
          {
            id: 'VjEtVmVydGljYWwtMTAxMA',
            talentType: 'designer',
            specializations: {
              nodes: [
                {
                  id: 'VjEtU3BlY2lhbGl6YXRpb24tMzEwMjg',
                  title: 'Core',
                  __typename: 'Specialization'
                }
              ],
              __typename: 'VerticalSpecializationConnection'
            },
            __typename: 'Vertical'
          }
        ],
        __typename: 'VerticalConnection'
      } as unknown as VerticalConnection,
      operations: getTalentOperations({
        applyTalentToAnotherVertical: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            applyTalentToAnotherVertical: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    GetApplyToDifferentVerticalSteps: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          completedScreeningSteps: ['ENGLISH'],
          completedProfileWizardSteps: [
            'EMPLOYMENT_HISTORY',
            'EDUCATION',
            'CERTIFICATIONS',
            'WORKING_HOURS'
          ],
          completedProfileFields: [],
          __typename: 'Talent'
        }
      }
    },
    GetTalentApplicationSkillsAutoComplete: {
      data: {
        node: {
          id: encodeEntityId('123', 'Vertical'),
          skillsAutocomplete: {
            edges: [
              {
                key: 'skills-keywords-6345',
                labelHighlight:
                  '{{strong}}A{{/strong}}WS {{strong}}A{{/strong}}LB',
                node: {
                  name: 'AWS ALB',
                  id: 'VjEtU2tpbGwtNjM0NQ',
                  __typename: 'Skill'
                },
                __typename: 'AutocompleteEdge'
              }
            ],
            __typename: 'AutocompleteConnection'
          },
          __typeName: 'Vertical'
        }
      }
    },
    ApplyTalentToAnotherVertical: {
      data: {
        applyTalentToAnotherVertical: {
          ...successOperationMock(),
          __typename: 'ApplyTalentToAnotherVerticalPayload',
          talent: {
            id: encodeEntityId('123', 'Talent'),
            associatedRoles: {
              nodes: [
                {
                  id: encodeEntityId('123', 'Talent'),
                  type: 'Developer',
                  __typename: 'Talent',
                  webResource: {
                    url: 'http://localhost:4016/talents/123',
                    __typename: 'Link'
                  },
                  talentCumulativeStatus: TalentCumulativeStatus.APPLIED
                }
              ],
              __typename: 'RoleOrClientConnection'
            },
            __typename: 'Talent'
          }
        }
      }
    }
  })

export default updateApplyToDifferentVerticalStubs
