import { encodeEntityId } from '@staff-portal/data-layer-service'

import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

export const getAvailabilityStepDataResponse = () => ({
  data: {
    newEngagementWizard: {
      acquireHighPriorityLockOperation: hiddenOperationMock(),
      availabilityConfirmed: null,
      commitment: 'HOURLY',
      commitmentTooLow: false,
      lockOverrideRequired: false,
      newEngagement: {
        trialLength: null,
        __typename: 'NewEngagement'
      },
      previousTalentEngagementForClient: null,
      job: {
        id: encodeEntityId('123', 'Job'),
        estimatedLength: 'LENGTH_6_12_MONTHS',
        __typename: 'Job'
      },
      parallelEngagements: {
        nodes: [
          {
            id: encodeEntityId('123', 'Client'),
            commitment: 'HOURLY',
            status: 'PENDING_EXPIRATION',
            cumulativeStatus: 'pending_expiration',
            client: {
              id: 'VjEtQ2xpZW50LTUxMzY5NA',
              enterprise: false,
              webResource: {
                text: "Vandervort, Koelpin and O'Conner",
                url: 'https://staging.toptal.net/platform/staff/companies/2436657',
                __typename: 'Link'
              },
              __typename: 'Client'
            },
            job: {
              id: encodeEntityId('124', 'Job'),
              expectedWeeklyHours: 0,
              webResource: {
                text: 'Junior Security Designer (289219)',
                url: 'https://staging.toptal.net/platform/staff/jobs/289219',
                __typename: 'Link'
              },
              __typename: 'Job'
            },
            currentInterviewLock: null,
            __typename: 'Engagement'
          }
        ],
        __typename: 'ParallelEngagementsConnection'
      },
      __typename: 'NewEngagementWizard'
    }
  }
})
