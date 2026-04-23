import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getJobOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { jobPageStubs } from '~integration/mocks/request-stubs'
import {
  getActiveJobPositionQuestionTemplatesResponse,
  getApproveJobDetailsResponse,
  getCoreSkillsResponse,
  getRecommendedSkillsResponse,
  getTalentMatchersResponse
} from '~integration/mocks/responses'

const updateClaimAndApproveJobStubs = (job?: Partial<Job>) =>
  cy.stubGraphQLRequests({
    ...jobPageStubs({
      operations: getJobOperations({
        approveJob: enabledOperationMock()
      }),
      ...job
    }),
    GetApproveJobDetails: getApproveJobDetailsResponse(job),
    GetTalentMatchers: getTalentMatchersResponse(),
    GetCoreSkills: getCoreSkillsResponse(job),
    GetRecommendedSkills: getRecommendedSkillsResponse(job),
    GetActiveJobPositionQuestionTemplates:
      getActiveJobPositionQuestionTemplatesResponse(),
    GetLazyOperation: {
      data: {
        node: {
          id: encodeEntityId('123', 'Job'),
          operations: {
            approveJob: enabledOperationMock(),
            __typename: 'JobOperations'
          },
          __typename: 'Job'
        }
      }
    },
    ApproveJob: { data: { approveJob: successMutationMock() } }
  })

export default updateClaimAndApproveJobStubs
