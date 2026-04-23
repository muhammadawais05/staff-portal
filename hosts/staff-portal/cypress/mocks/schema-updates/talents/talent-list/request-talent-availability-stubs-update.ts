import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'
import { talentListPageStubs } from '~integration/mocks/request-stubs'
import {
  getJobCandidatesResponse,
  getTalentAvailabilityRequestResponse,
  getTalentListItemResponse,
  getTalentListJobDataResponse,
  getTalentsListJobFilterOptionsResponse
} from '~integration/mocks/responses/talents/talent-list'
import talentJobListItemMock from '~integration/mocks/talent-job-list-item-mock'
import { successOperationMock } from '~integration/mocks/operations'
import { disabledOperationMock } from '~integration/mocks/disabled-operation-mock'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

const updateRequestTalentAvailabilityStubs = () => {
  const talentId = encodeEntityId('123', 'Talent')
  const jobId = encodeEntityId('280820', 'Job')
  const clientId = encodeEntityId('789', 'Client')

  const talent = talentJobListItemMock({
    id: talentId,
    operations: {
      createTalentAvailabilityRequest: enabledOperationMock()
    } as Talent['operations']
  })

  return cy.stubGraphQLRequests({
    ...talentListPageStubs({
      talents: [
        {
          id: talentId,
          __typename: 'Talent'
        } as unknown as Talent
      ]
    }),
    GetJobCandidates: getJobCandidatesResponse(jobId, talentId),
    GetTalentListJobData: getTalentListJobDataResponse(jobId, clientId),
    GetTalentsListJobFilterOptions: getTalentsListJobFilterOptionsResponse(
      jobId,
      clientId
    ),
    GetJobTalentListItem: getTalentListItemResponse(talent),
    GetTalentAvailabilityRequest: getTalentAvailabilityRequestResponse(
      jobId,
      talentId
    ),
    GetLazyOperation: {
      data: {
        node: {
          id: talentId,
          operations: {
            createTalentAvailabilityRequest: enabledOperationMock(),
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    CreateTalentAvailabilityRequest: {
      data: {
        createTalentAvailabilityRequest: {
          ...successOperationMock(),
          __typename: 'CreateTalentAvailabilityRequestPayload',
          talent: {
            id: talent.id,
            operations: {
              addTalentToJobFavorites: disabledOperationMock(),
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

export default updateRequestTalentAvailabilityStubs
