import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'

const updateTalentMoreActionsReactivateTalentStubs = (
  talent?: Partial<Talent>
) => {
  const talentId = encodeEntityId('123', 'Talent')

  return cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        reactivateTalent: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: talentId,
          operations: {
            reactivateTalent: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    ReactivateTalent: {
      data: {
        reactivateTalent: {
          ...successOperationMock(),
          __typename: 'ReactivateTalentPayload'
        }
      }
    }
  })
}

export default updateTalentMoreActionsReactivateTalentStubs
