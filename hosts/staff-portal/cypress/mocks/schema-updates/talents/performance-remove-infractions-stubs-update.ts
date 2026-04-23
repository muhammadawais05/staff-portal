import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { talentPerformanceStubs } from '~integration/mocks/request-stubs/talents/tabs/performance'

const updateRemoveInfractionStubs = (talent?: Partial<Talent>) => {
  const talentInfraction = {
    operations: getTalentOperations({
      removeTalentInfraction: enabledOperationMock()
    }),
    infractions: {
      totalCount: 0,
      nodes: []
    },
    ...talent
  }

  return cy.stubGraphQLRequests({
    ...talentPerformanceStubs(talentInfraction),
    RemoveTalentInfraction: {
      data: {
        removeTalentInfraction: successMutationMock()
      }
    }
  })
}

export default updateRemoveInfractionStubs
