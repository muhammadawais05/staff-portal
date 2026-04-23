import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export default {
  id: 'VjEtQ2xpZW50LTIxNDA2MA',
  stage: 'Late Stage Startup',
  totalFunding: '1000',
  acquiredBy: ['Google', 'Facebook'],
  acquiredCompanies: ['Pizza Hut', 'Burger King'],
  operations: {
    patchClientProfile: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'ClientOperations'
  },
  __typename: 'Client'
}
