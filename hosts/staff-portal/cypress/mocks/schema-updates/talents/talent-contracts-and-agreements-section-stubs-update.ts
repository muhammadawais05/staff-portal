import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOperations } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateTalentContractsAndAgreementsStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      operations: getTalentOperations({
        destroyContract: enabledOperationMock()
      }),
      ...talent
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Contract'),
          operations: getTalentOperations({
            destroyContract: enabledOperationMock()
          }),
          __typename: 'Contract'
        }
      }
    },
    DestroyContract: { data: { destroyContract: successMutationMock() } }
  })

export default updateTalentContractsAndAgreementsStubs
