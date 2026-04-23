import { encodeEntityId } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export const getOpportunityMock = {
  __typename: 'Opportunity',
  id: encodeEntityId('1', 'Opportunity'),
  jobs: {
    nodes: []
  },
  tasks: {
    nodes: []
  },
  weightedValue: '9600',
  name: 'Data Engineer/Analyst',
  salesforceId: '0064w000011hHmyAAE',
  status: 'QUALIFYING',
  casesUrl: 'http://localhost:3000/platform/staff/opportunities/1/cases',
  webResource: {
    text: 'Data Engineer/Analyst',
    url: 'http://localhost:3000/platform/staff/opportunities/1'
  },
  operations: {
    deleteOpportunity: {
      __typename: 'Operation',
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}
