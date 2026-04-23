import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOperations } from '~integration/mocks/fragments'
import { enabledOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateTalentSpecializationApplicationsStubs = (
  talent?: Partial<Talent>
) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      operations: getTalentOperations({
        sendTalentToSpecialization: enabledOperationMock(),
        addTalentToRemoteConsulting: enabledOperationMock()
      }),
      ...talent
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            sendTalentToSpecialization: enabledOperationMock(),
            addTalentToRemoteConsulting: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    SendTalentToSpecialization: {
      data: {
        sendTalentToSpecialization: {
          talent: { id: encodeEntityId('123', 'Talent') },
          ...successMutationMock()
        }
      }
    },
    AddTalentToRemoteConsulting: {
      data: {
        addTalentToRemoteConsulting: {
          talent: { id: encodeEntityId('123', 'Talent') },
          ...successMutationMock()
        }
      }
    }
  })

export default updateTalentSpecializationApplicationsStubs
