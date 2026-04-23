import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { talentPerformanceStubs } from '~integration/mocks/request-stubs/talents/tabs/performance'

const updateInfractionStubs = (talent?: Partial<Talent>) => {
  const talentInfraction = {
    operations: getTalentOperations({
      createTalentInfraction: enabledOperationMock()
    }),
    infractions: {
      totalCount: 1,
      nodes: []
    },
    ...talent
  }

  return cy.stubGraphQLRequests({
    ...talentPerformanceStubs(talentInfraction),
    CreateTalentInfraction: {
      data: {
        createTalentInfraction: successMutationMock()
      }
    }
  })
}

export default updateInfractionStubs
