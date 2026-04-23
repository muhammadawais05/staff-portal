import { Talent } from '@staff-portal/graphql/staff'

import { talentPerformanceStubs } from '~integration/mocks/request-stubs/talents/tabs/performance'
import { successMutationMock } from '~integration/mocks/mutations'
import { getTalentInfractionMock } from '~integration/mocks/fragments'

const updateEditInfractionStubs = (talent?: Partial<Talent>) => {
  const talentInfraction = {
    ...talent,
    infractions: {
      totalCount: 1,
      nodes: [
        getTalentInfractionMock()
      ]
    }
  }

  return cy.stubGraphQLRequests({
    ...talentPerformanceStubs(talentInfraction),
    ChangeTalentInfraction: {
      data: {
        changeTalentInfraction: successMutationMock()
      }
    }
  })
}

export default updateEditInfractionStubs
