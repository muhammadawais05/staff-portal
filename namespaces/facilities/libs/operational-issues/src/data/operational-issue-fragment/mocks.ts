import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { OperationalIssueFragment } from './operational-issue-fragment.staff.gql.types'

export const createOperationalIssueMock = (
  index: number,
  operationalIssue: Partial<
    OperationalIssueFragment & { template?: { __typename?: string } | null }
  >
) => ({
  id: encodeEntityId(index.toString(), 'OperationalIssue'),
  description: `Project Manager Matchers - #${index}`,
  lastTimeOccurredAt: '2020-03-22T21:59:59-06:00',
  occurrencesCount: 1,
  operations: {
    approveOperationalIssue: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    reopenOperationalIssue: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    resolveOperationalIssue: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    claimOperationalIssue: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    verifyOperationalIssue: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'OperationalIssueOperations'
  },
  template: {
    id: encodeEntityId('123', 'Test'),
    name: 'Send first candidate time',
    recommendedSolutions: `* Think about expanding the team↵* Check for issues with the screening team
      `,
    __typename: 'OperationalIssueTemplate'
  },
  ...operationalIssue,
  __typename: 'OperationalIssue'
})
