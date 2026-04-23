import { Talent } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { talentPerformanceStubs } from '~integration/mocks/request-stubs/talents/tabs/performance'

const updateHealthStatusStubs = (talent?: Partial<Talent>) => {
  const talentHealth = {
    operations: getTalentOperations({
      setHealthStatusTalent: enabledOperationMock()
    }),
    currentHealthStatus: null,
    healthStatusHistory: {
      totalCount: 1,
      nodes: []
    },
    ...talent
  }

  return cy.stubGraphQLRequests({
    ...talentPerformanceStubs(talentHealth),
    SetHealthStatusTalent: {
      data: {
        setHealthStatusTalent: successMutationMock()
      }
    }
  })
}

export default updateHealthStatusStubs
