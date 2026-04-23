import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import {
  getRoleFlagsLazyOperations,
  getRoleMissingFlags
} from '~integration/mocks/responses'
import { successMutationMock } from '~integration/mocks/mutations'

const updateTalentProfilePageWithRoleFlagsStubs = () =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      operations: getTalentOperations({
        addRoleFlag: enabledOperationMock()
      })
    }),
    GetLazyOperation: getRoleFlagsLazyOperations('Talent'),
    GetRoleMissingFlags: getRoleMissingFlags('Talent'),
    CallContact: {
      data: {
        callContact: successMutationMock({
          externalCallUrl: '/talents/911',
          __typename: 'CallContactPayload'
        })
      }
    }
  })

export default updateTalentProfilePageWithRoleFlagsStubs
