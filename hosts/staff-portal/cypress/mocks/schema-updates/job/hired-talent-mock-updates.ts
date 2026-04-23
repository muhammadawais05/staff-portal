import {
  EngagementResolvers,
  LinkResolvers,
  Job,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { jobMock } from '~integration/mocks'
import { engagementNodeMock } from '~integration/mocks/fragments'
import { convertToResolver } from '~integration/utils'
import { operationMock } from '~integration/mocks/operations'
import { successMutationMock } from '~integration/mocks/mutations'

const updateHiredTalentMocks = (partialJob?: Partial<Job>) => {
  const engagement = engagementNodeMock({
    engagementOperation: {
      ...operationMock(
        'changeEngagementTrialLength',
        OperationCallableTypes.ENABLED
      )
    }
  }).node()
  const job: Partial<Job> = {
    engagements: {
      nodes: [engagement],
      edges: [],
      totalCount: 1
    },
    ...partialJob
  }

  cy.updateStaffMocks({
    Link: convertToResolver<LinkResolvers, 'Link'>({
      url: 'https://staging.toptal.net/platform/staff/jobs/123'
    }),
    Engagement: convertToResolver<EngagementResolvers, 'Engagement'>(
      engagement
    ),
    Query: {
      node: () => jobMock(job),
      staffNode: () => jobMock(job)
    },
    Mutation: {
      changeEngagementTrialLength: successMutationMock
    }
  })
}

export default updateHiredTalentMocks
