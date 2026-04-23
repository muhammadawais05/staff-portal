import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { talentApplicantsPageStub } from '~integration/mocks/request-stubs'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successOperationMock } from '~integration/mocks/operations'

const updatePauseTalentApplicationStubsForTalentApplicantsPage = (
  talent?: Partial<Talent>
) => {
  cy.stubGraphQLRequests({
    ...talentApplicantsPageStub({
      ...talent,
      operations: getTalentOperations({
        pauseTalent: enabledOperationMock()
      })
    }),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Talent'),
          operations: getTalentOperations({
            pauseTalent: enabledOperationMock()
          }),
          __typename: 'Talent'
        }
      }
    },
    PauseTalent: {
      data: {
        pauseTalent: successOperationMock()
      }
    }
  })
}

export default updatePauseTalentApplicationStubsForTalentApplicantsPage
