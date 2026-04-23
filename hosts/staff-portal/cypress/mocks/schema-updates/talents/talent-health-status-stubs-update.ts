import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'

const updateTalentHealthStatusStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      operations: getTalentOperations({
        setHealthStatusTalent: enabledOperationMock()
      }),
      ...talent
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            setHealthStatusTalent: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    SetHealthStatusTalent: {
      data: {
        setHealthStatusTalent: successMutationMock()
      }
    }
  })

export default updateTalentHealthStatusStubs
