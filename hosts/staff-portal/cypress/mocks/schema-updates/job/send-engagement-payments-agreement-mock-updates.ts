import {
  EngagementResolvers,
  Job,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { successMutationMock } from '~integration/mocks/mutations'
import { jobMock } from '~integration/mocks'
import {
  clientNodeMock,
  engagementNodeMock,
  jobNodeMock,
  talentNodeMock
} from '~integration/mocks/fragments'
import { operationMock } from '~integration/mocks/operations'
import { convertToResolver } from '~integration/utils'

const updateSendEngagementPaymentsAgreementMocks = (
  partialJob?: Partial<Job>
) => {
  const defaultJob = jobNodeMock({ title: 'Some Job Title' }).node()
  const engagement = engagementNodeMock({
    node: {
      talent: talentNodeMock({
        fullName: 'Some Talent Full Name'
      }).node(),
      client: clientNodeMock({
        fullName: 'Some Client Full Name'
      }).node(),
      job: defaultJob
    },
    engagementOperation: {
      ...operationMock(
        'sendSemiMonthlyEngagementPaymentsAgreement',
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
    ...defaultJob,
    ...partialJob
  }

  cy.updateStaffMocks({
    Engagement: convertToResolver<EngagementResolvers, 'Engagement'>(
      engagement
    ),
    Query: {
      node: () => jobMock(job),
      staffNode: () => jobMock(job)
    },
    Mutation: {
      sendSemiMonthlyEngagementPaymentsAgreement: successMutationMock
    }
  })
}

export default updateSendEngagementPaymentsAgreementMocks
