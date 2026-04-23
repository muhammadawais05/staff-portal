import { Talent, Viewer } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { talentListPageStubs } from '~integration/mocks/request-stubs'
import {
  getChromeResponse,
  getRoleFlagsResponse
} from '~integration/mocks/responses'
import {
  getJobCandidatesResponse,
  getJobFavoriteTalentsResponse,
  getTalentListItemResponse,
  getTalentListJobDataResponse,
  getTalentsListJobFilterOptionsResponse
} from '~integration/mocks/responses/talents/talent-list'
import talentJobListItemMock from '~integration/mocks/talent-job-list-item-mock'
import { successOperationMock } from '~integration/mocks/operations'

const updateRemoveTalentFromJobFavoritesStubs = () => {
  const talent = talentJobListItemMock({
    operations: {
      addTalentToJobFavorites: hiddenOperationMock(),
      removeTalentFromJobFavorites: enabledOperationMock()
    } as unknown as Talent['operations']
  })
  const jobId = '123'

  return cy.stubGraphQLRequests({
    ...talentListPageStubs(),
    GetJobCandidates: getJobCandidatesResponse(talent.id, jobId),
    GetTalentListJobData: getTalentListJobDataResponse(jobId),
    GetTalentsListJobFilterOptions:
      getTalentsListJobFilterOptionsResponse(jobId),
    GetJobTalentListItem: getTalentListItemResponse(talent),
    GetRoleFlags: getRoleFlagsResponse(),
    GetChrome: getChromeResponse({
      permits: { handleRoleMetrics: true }
    } as unknown as Viewer),
    GetJobFavoriteTalents: getJobFavoriteTalentsResponse(jobId),
    RemoveTalentFromJobFavorites: {
      data: {
        removeTalentFromJobFavorites: {
          ...successOperationMock(),
          __typename: 'RemoveTalentFromJobFavoritesPayload',
          talent: {
            id: talent.id,
            operations: {
              addTalentToJobFavorites: enabledOperationMock(),
              removeTalentFromJobFavorites: hiddenOperationMock(),
              __typename: 'TalentOperations'
            },
            __typename: 'Talent'
          }
        }
      }
    }
  })
}

export default updateRemoveTalentFromJobFavoritesStubs
