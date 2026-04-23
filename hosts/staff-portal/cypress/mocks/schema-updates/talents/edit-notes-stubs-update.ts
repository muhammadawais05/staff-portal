import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'

const updateEditNotesStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      ...talent,
      operations: getTalentOperations({
        updateBillingNotes: enabledOperationMock()
      }) as unknown as Talent['operations']
    }),
    UpdateBillingNotes: {
      data: {
        updateBillingNotes: {
          success: true,
          errors: [],
          __typename: 'UpdateBillingNotesPayload',
          roleOrClient: {
            id: encodeEntityId('123', 'Talent'),
            billingNotes: 'a',
            __typename: 'Talent'
          }
        }
      }
    }
  })

export default updateEditNotesStubs
