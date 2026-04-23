import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'

const updatePassPrescreeningStubs = () =>
  cy.stubGraphQLRequests({
    ...talentProfileStubs({
      operations: {
        ...getTalentOperations(),
        passOnboardingTalentPrescreening: enabledOperationMock()
      }
    }),
    PassOnboardingTalentPrescreening: {
      data: {
        passOnboardingTalentPrescreening: successMutationMock()
      }
    },
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: {
            passOnboardingTalentPrescreening: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    }
  })

export default updatePassPrescreeningStubs
