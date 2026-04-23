import {
  GENERAL_APP_QUERIES_BATCH_KEY,
  gql,
  useGetData,
  BATCH_KEY
} from '@staff-portal/data-layer-service'

import { GetOperationalIssuesCountDocument } from './get-operational-issues-count.staff.gql.types'

export const GET_OPERATIONAL_ISSUES_COUNT = gql`
  query GetOperationalIssuesCount {
    operationalIssues(
      filter: { ownedBy: ME }
      pagination: { offset: 0, limit: 0 }
    ) {
      totalCount
    }
  }
`

export const useGetOperationalIssuesCount = () =>
  useGetData(GetOperationalIssuesCountDocument, 'operationalIssues')(
    undefined,
    {
      throwOnError: true,
      context: { [BATCH_KEY]: GENERAL_APP_QUERIES_BATCH_KEY }
    }
  )
