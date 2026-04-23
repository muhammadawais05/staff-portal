import { Client } from '@staff-portal/graphql/staff'

import { getOpportunityOperations } from '~integration/mocks/fragments'

export const getOpportunitiesResponse = (client?: Partial<Client>) => ({
  data: {
    staffNode: {
      id: 'VjEtQ2xpZW50LTMzNzkzOQ',
      businessType: 'ENTERPRISE_BUSINESS',
      children: {
        totalCount: 8,
        __typename: 'ClientChildrenConnection'
      },
      createOpportunityUrl: {
        enabled: true,
        messages: [],
        url: null,
        __typename: 'UrlWithMessages'
      },
      opportunities: {
        nodes: [
          {
            id: 'VjEtT3Bwb3J0dW5pdHktMTAxNTE',
            type: 'Opportunity',
            status: null,
            salesforceId: 'salesforceId',
            jobs: {
              nodes: [
                {
                  id: 'VjEtSm9iLTI0MjA5NQ',
                  __typename: 'Job'
                }
              ],
              __typename: 'OpportunityJobConnection'
            },
            tasks: {
              nodes: [],
              __typename: 'OpportunityTaskConnection'
            },
            weightedValue: '0',
            updatedAt: '2021-05-13T19:57:52+03:00',
            name: 'Coby Kavanaugh - React Node Dev',
            casesUrl:
              'https://staging.toptal.net/platform/staff/opportunities/10151/cases',
            webResource: {
              text: 'Coby Kavanaugh - React Node Dev',
              url: 'https://staging.toptal.net/platform/staff/opportunities/10151',
              __typename: 'Link'
            },
            operations: getOpportunityOperations(),
            __typename: 'Opportunity'
          }
        ],
        __typename: 'OpportunityConnection'
      },
      ...client,
      __typename: 'Client'
    }
  }
})
