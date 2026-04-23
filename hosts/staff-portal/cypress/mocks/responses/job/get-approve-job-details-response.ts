import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

import { getJobMock } from '~integration/mocks/fragments'

export const getApproveJobDetailsResponse = (job?: Partial<Job>) => ({
  data: {
    node: getJobMock({ description: 'Some description', ...job }),
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        inTalentMatchers: false,
        __typename: 'Staff'
      },
      permits: {
        canManageJobMaxHourlyRate: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    jobLongshotReasons: ['This skill has a limited supply of market/worldwide'],
    jobUncertainOfBudgetReasons: [],
    activeJobPositionQuestionTemplates: {
      nodes: [],
      __typename: 'JobPositionQuestionTemplateConnection'
    }
  }
})
