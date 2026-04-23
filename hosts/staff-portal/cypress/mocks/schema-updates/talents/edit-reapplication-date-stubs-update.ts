import { Scalars, Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'

const updateEditReapplicationDateStubs = (reapplicationDate: Scalars['Date']) =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      reapplicationDate: reapplicationDate,
      operations: getTalentOperations({
        updateTalentReapplicationDate: enabledOperationMock()
      }) as Talent['operations']
    }),
    UpdateTalentReapplicationDate: {
      data: {
        updateTalentReapplicationDate: {
          success: true,
          errors: []
        }
      }
    }
  })

export default updateEditReapplicationDateStubs
