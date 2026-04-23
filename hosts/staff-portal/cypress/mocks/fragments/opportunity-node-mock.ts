import {
  Opportunity,
  OpportunityStatus,
  Client
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { webResourceMock } from '.'
import {
  opportunityOperationsMock,
  OpportunityOperationType
} from './opportunity-operations-mock'
import { getClientMock } from './get-client-mock'

export const opportunityNodeMock = ({
  node = {},
  opportunityOperation
}: {
  node?: {}
  opportunityOperation?: OpportunityOperationType
} = {}) => ({
  node: (): Opportunity =>
    ({
      __typename: 'Opportunity',
      id: encodeEntityId('123', 'Opportunity'),
      age: 60,
      budget: null,
      committedRevenue: '188690.0',
      completeOutcome: null,
      completeReason: null,
      completeResult: null,
      contractUrl: null,
      type: 'Enterprise',
      open: true,
      name: 'Test Opportunity',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla sodales est.',
      complete: false,
      enterprise: false,
      probability: 60,
      value: 1000,
      jobs: {
        nodes: [
          {
            __typename: 'Job',
            id: encodeEntityId('123', 'Job'),
            title: 'Medical Doctor (123)',
            createdAt: '2022-02-03T21:17:27+03:00',
            lastAction: '2022-03-01T20:56:13+03:00',
            status: 'ACTIVE',
            opportunityStagesNames: '',
            talentPortalLink: {
              text: 'Medical Doctor (123)',
              url: 'https://talent.toptal.net/portal/job/123'
            },
            committedRevenue: '$40,320.00'
          }
        ],
        totalCount: 1
      },
      tasks: {
        nodes: [],
        totalCount: 0
      },
      createdAt: '2021-06-10T20:17:58+03:00',
      highPriority: null,
      highPriorityReason: null,
      casesUrl:
        'https://staging.toptal.net/platform/staff/opportunities/123/cases',
      poAmount: null,
      poNumber: null,
      salesforceId: null,
      salesforceUrl: null,
      weightedValue: '1000',
      status: OpportunityStatus.SOLUTIONING,
      updatedAt: '',
      client: getClientMock() as Client,
      workType: null,
      ...webResourceMock({
        text: 'Test Opportunity'
      }),
      operations: {
        ...opportunityOperationsMock(opportunityOperation)
      },
      ...node
    } as unknown as Opportunity)
})
