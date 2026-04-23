import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'

const updateTalentMoreActionsDeactivateTalentStubs = (
  talent?: Partial<Talent>
) => {
  const talentId = encodeEntityId('123', 'Talent')

  return cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        removeTalent: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: talentId,
          operations: {
            removeTalent: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    DeactivateTalent: {
      data: {
        removeTalent: {
          ...successOperationMock(),
          __typename: 'RemoveTalentPayload'
        }
      }
    }
  })
}

export default updateTalentMoreActionsDeactivateTalentStubs
