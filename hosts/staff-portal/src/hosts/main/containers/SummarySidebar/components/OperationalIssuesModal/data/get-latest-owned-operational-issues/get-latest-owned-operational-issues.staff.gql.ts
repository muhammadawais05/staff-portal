import { ApolloError, gql, useQuery } from '@staff-portal/data-layer-service'

import { GetLatestOperationalIssuesForUserDocument } from './get-latest-owned-operational-issues.staff.gql.types'
import { OWNED_OPERATIONAL_ISSUE_FRAGMENT } from '../../../../data/owned-operational-issue-fragment'

export const GET_LATEST_OWNED_OPERATIONAL_ISSUES: typeof GetLatestOperationalIssuesForUserDocument = gql`
  query GetLatestOperationalIssuesForUser($id: ID!, $limit: Int!) {
    staffNode(id: $id) {
      ... on Role {
        id
        pendingOperationalIssues: ownedOperationalIssues(
          filter: { scope: PENDING }
          pagination: { offset: 0, limit: $limit }
        ) {
          ...OperationalIssueOffsetConnectionFragment
        }

        claimedOperationalIssues: ownedOperationalIssues(
          filter: { scope: CLAIMED }
          pagination: { offset: 0, limit: $limit }
        ) {
          ...OperationalIssueOffsetConnectionFragment
        }

        resolvedOperationalIssues: ownedOperationalIssues(
          filter: { scope: RESOLVED }
          pagination: { offset: 0, limit: $limit }
        ) {
          ...OperationalIssueOffsetConnectionFragment
        }
      }
    }
  }

  fragment OperationalIssueOffsetConnectionFragment on OperationalIssueOffsetConnection {
    nodes {
      ...OwnedOperationalIssueFragment
    }
    totalCount
  }

  ${OWNED_OPERATIONAL_ISSUE_FRAGMENT}
`

export const useGetLatestOwnedOperationalIssues = ({
  ownedBy,
  limit,
  onError = () => {}
}: {
  ownedBy: string
  limit: number
  onError?: (error: ApolloError) => void
}) => {
  const { data, loading } = useQuery(GET_LATEST_OWNED_OPERATIONAL_ISSUES, {
    variables: { id: ownedBy, limit },
    onError
  })

  return { loading, data: data?.staffNode }
}
