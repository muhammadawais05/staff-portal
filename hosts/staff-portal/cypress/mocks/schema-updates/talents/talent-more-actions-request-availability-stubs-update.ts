import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'
import { disabledOperationMock } from '~integration/mocks/disabled-operation-mock'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

const updateTalentMoreActionsRequestAvailabilityStubs = (
  talent?: Partial<Talent>
) => {
  const talentId = encodeEntityId('123', 'Talent')
  const clientId = encodeEntityId('123', 'Client')

  return cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        createTalentAvailabilityRequest: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: talentId,
          operations: {
            createTalentAvailabilityRequest: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    GetClientAutocomplete: {
      data: {
        autocomplete: {
          edges: [
            {
              key: 'companies-names',
              label: 'Wuckert-Feest UN',
              labelHighlight: '{{strong}}Wuckert-Feest{{/strong}}',
              nodeTypes: ['company'],
              photo: null,
              node: {
                id: clientId,
                companyLegacyId: 2538204,
                __typename: 'Client'
              },
              __typename: 'AutocompleteEdge'
            }
          ],
          __typename: 'AutocompleteConnection'
        }
      }
    },
    GetTalentAvailabilityRequest: {
      data: {
        node: {
          id: talentId,
          type: 'Developer',
          jobAvailabilityRequests: {
            edges: [
              {
                job: {
                  id: 'VjEtSm9iLTI4Mjg5Ng',
                  title: 'Skill tester ',
                  __typename: 'Job'
                },
                restrictionWarning: null,
                availabilityRequest: null,
                __typename: 'JobAvailabilityRequestEdge'
              }
            ],
            __typename: 'JobAvailabilityRequestConnection'
          },
          __typename: 'Talent'
        }
      }
    },
    CreateTalentAvailabilityRequest: {
      data: {
        createTalentAvailabilityRequest: {
          ...successOperationMock(),
          __typename: 'CreateTalentAvailabilityRequestPayload',
          talent: {
            id: talentId,
            operations: {
              addTalentToJobFavorites: disabledOperationMock(),
              removeTalentFromJobFavorites: hiddenOperationMock(),
              __typename: 'TalentOperations'
            },
            __typename: 'Talent'
          }
        }
      }
    }
  })
}

export default updateTalentMoreActionsRequestAvailabilityStubs
