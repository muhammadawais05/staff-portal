import { Feedback } from '@staff-portal/graphql/staff'

import { getFeedbackMock } from '~integration/mocks/fragments'
import { engagementPageStubs } from '~integration/mocks/request-stubs'
import { getMarkOutdatedFeedbackOperationResponse } from '~integration/mocks/responses'
import { successMutationMock } from '../../mutations'

const updateMarkOutdateFeedbackStubs = () =>
  cy.stubGraphQLRequests({
    ...engagementPageStubs({
      feedbacks: {
        totalCount: 1,
        nodes: [getFeedbackMock() as Feedback]
      }
    }),
    GetLazyOperation: getMarkOutdatedFeedbackOperationResponse(),
    MarkOutdatedFeedback: {
      data: {
        markOutdatedFeedback: successMutationMock()
      }
    }
  })

export default updateMarkOutdateFeedbackStubs
