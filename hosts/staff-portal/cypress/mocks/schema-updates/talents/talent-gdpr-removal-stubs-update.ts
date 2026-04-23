import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successOperationMock } from '~integration/mocks/operations'
import { getTalentOperations } from '~integration/mocks/fragments'

const updateTalentGdprRemovalStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        processGdprRemovalTalent: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            processGdprRemovalTalent: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    ProcessGdprRemovalTalent: {
      data: {
        processGdprRemovalTalent: {
          ...successOperationMock(),
          talent: {
            id: encodeEntityId('123', 'Talent'),
            operations: getTalentOperations({
              processGdprRemovalTalent: enabledOperationMock()
            })
          }
        }
      }
    }
  })

export default updateTalentGdprRemovalStubs
