import { encodeEntityId } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export const opportunityAttributionFragmentMock = {
  __typename: 'Opportunity',
  id: encodeEntityId('1', 'Opportunity'),
  partner: 'Enterprise Software',
  offering: 'Projects',
  source: 'Twitter',
  event: '11/2/17 Toptal Ent Dinner DEN',
  marketingCampaign: 'SEM',
  operations: {
    updateOpportunity: {
      __typename: 'Operation',
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}
