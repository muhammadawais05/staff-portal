import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Opportunity } from '@staff-portal/graphql/staff'

export const getOpportunityJobsMock = (
  opportunity?: Partial<Opportunity> | null
) => ({
  id: encodeEntityId('123', 'Opportunity'),
  __typename: 'Opportunity',
  type: 'Opportunity',
  name: 'Dental CRM Platform',
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
    __typename: 'OpportunityJobConnection'
  },
  ...opportunity
})
