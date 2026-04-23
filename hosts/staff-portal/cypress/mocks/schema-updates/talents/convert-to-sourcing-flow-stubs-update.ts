import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOperations } from '~integration/mocks/fragments'
import { getConvertToSourcingFlowResponse } from '~integration/mocks/responses'
import { successOperationMock } from '~integration/mocks/operations'

const updateConvertToSourcingFlowStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        convertToSourcingFlow: enabledOperationMock()
      })
    }),
    GetTalentApplicationSkillsAutoComplete: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          vertical: {
            id: 'VjEtQ291bnRyeS0xODE',
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
            __typename: 'Vertical'
          },
          __typename: 'Talent'
        }
      }
    },
    GetConvertToSourcingFlowInfo: getConvertToSourcingFlowResponse(talent),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            convertToSourcingFlow: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    ConvertToSourcingFlow: {
      data: {
        convertToSourcingFlow: successOperationMock()
      }
    }
  })

export default updateConvertToSourcingFlowStubs
