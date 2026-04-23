import { Talent, Viewer } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import jobFavoriteTalentMock from '~integration/mocks/job-favorite-talent-mock'
import { talentListPageStubs } from '~integration/mocks/request-stubs'
import { getChromeResponse } from '~integration/mocks/responses'
import {
  getJobFavoriteTalentsResponse,
  getTalentListItemResponse
} from '~integration/mocks/responses/talents/talent-list'
import talentJobListItemMock from '~integration/mocks/talent-job-list-item-mock'
import { successOperationMock } from '~integration/mocks/operations'

const updateAddTalentToJobFavoritesStubs = () => {
  const talent = talentJobListItemMock({
    id: encodeEntityId('123', 'Talent'),
    operations: {
      addTalentToJobFavorites: enabledOperationMock(),
      removeTalentFromJobFavorites: hiddenOperationMock()
    } as unknown as Talent['operations']
  })
  const jobFavoritesMock = [jobFavoriteTalentMock({ id: talent.id })]
  const jobId = '123'

  return cy.stubGraphQLRequests({
    ...talentListPageStubs(),
    GetJobTalentListItem: getTalentListItemResponse(talent),
    GetChrome: getChromeResponse({
      permits: { handleRoleMetrics: true }
    } as unknown as Viewer),
    GetJobFavoriteTalents: getJobFavoriteTalentsResponse(
      jobId,
      jobFavoritesMock
    ),
    AddTalentToJobFavorites: {
      data: {
        addTalentToJobFavorites: {
          ...successOperationMock(),
          talent: {
            id: talent.id,
            operations: {
              addTalentToJobFavorites: hiddenOperationMock(),
              removeTalentFromJobFavorites: enabledOperationMock(),
              __typename: 'TalentOperations'
            },
            __typename: 'Talent'
          },
          __typename: 'AddTalentToJobFavoritesPayload'
        }
      }
    }
  })
}

export default updateAddTalentToJobFavoritesStubs
