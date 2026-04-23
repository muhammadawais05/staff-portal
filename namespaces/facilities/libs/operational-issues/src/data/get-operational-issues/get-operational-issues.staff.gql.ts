import { gql, useGetData } from '@staff-portal/data-layer-service'

import { OPERATIONAL_ISSUE_FRAGMENT } from '../operational-issue-fragment/operational-issue-fragment.staff.gql'
import { GetOperationalIssuesDocument } from './get-operational-issues.staff.gql.types'

export const GET_OPERATIONAL_ISSUES: typeof GetOperationalIssuesDocument = gql`
  query GetOperationalIssues {
    operationalIssues(
      filter: { ownedBy: ME }
      pagination: { offset: 0, limit: 5 }
    ) {
      nodes {
        ...OperationalIssueFragment
      }
      totalCount
    }
  }
  ${OPERATIONAL_ISSUE_FRAGMENT}
`

export const useGetOperationalIssues = () =>
  useGetData(GetOperationalIssuesDocument, 'operationalIssues')(undefined, {
    throwOnError: true
  })
