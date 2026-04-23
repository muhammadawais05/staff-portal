import { gql, useApolloClient, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetOwnedOperationalIssuesDocument,
  GetOwnedOperationalIssuesQuery,
  GetOwnedOperationalIssuesQueryVariables
} from './get-owned-operational-issues.staff.gql.types'
import { OWNED_OPERATIONAL_ISSUE_FRAGMENT } from '../../../../data/owned-operational-issue-fragment'

export const GET_OWNED_OPERATIONAL_ISSUES: typeof GetOwnedOperationalIssuesDocument = gql`
  query GetOwnedOperationalIssues(
    $ownerId: ID!
    $scope: RoleOwnedOperationalIssueScope!
    $pagination: OffsetPagination!
  ) {
    staffNode(id: $ownerId) {
      ... on Role {
        ownedOperationalIssues(
          filter: { scope: $scope }
          pagination: $pagination
        ) {
          nodes {
            ...OwnedOperationalIssueFragment
          }
          totalCount
        }
      }
    }
  }

  ${OWNED_OPERATIONAL_ISSUE_FRAGMENT}
`

const appendQueryResult = ({
  previousResult,
  appendedResult
}: {
  previousResult: GetOwnedOperationalIssuesQuery
  appendedResult: GetOwnedOperationalIssuesQuery
}) => {
  const previousResultNodes =
    previousResult.staffNode?.ownedOperationalIssues?.nodes || []
  const appendedResultNodes =
    appendedResult.staffNode?.ownedOperationalIssues?.nodes || []

  return Object.assign(
    {},
    {
      staffNode: {
        ownedOperationalIssues: {
          nodes: [...previousResultNodes, ...appendedResultNodes],
          totalCount: previousResultNodes.length,
          __typename: 'OperationalIssueOffsetConnection'
        },
        __typename: 'Staff'
      }
    }
  )
}

export const useGetOwnedOperationalIssues = ({
  onError
}: {
  onError: (error: Error) => void
}) => {
  const client = useApolloClient()
  const [performQuery, { fetchMore: fetchMoreApollo, loading, data }] =
    useLazyQuery(GET_OWNED_OPERATIONAL_ISSUES, {
      onError
    })

  const getOperationalIssues = (
    variables: GetOwnedOperationalIssuesQueryVariables
  ) => {
    if (!fetchMoreApollo) {
      performQuery({ variables })

      return
    }

    fetchMoreApollo({
      variables,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }

        if (!previousResult) {
          return fetchMoreResult
        }

        return appendQueryResult({
          previousResult,
          appendedResult: fetchMoreResult
        })
      }
    })
  }

  const resetQueryCache = () => {
    client.writeQuery({
      query: GET_OWNED_OPERATIONAL_ISSUES,
      data: {
        staffNode: {
          ownedOperationalIssues: {
            nodes: [],
            totalCount: 0,
            __typename: 'OperationalIssueOffsetConnection'
          },
          __typename: 'Staff'
        } as any // eslint-disable-line
      }
    })
  }

  return {
    getOperationalIssues,
    resetQueryCache,
    loading,
    data: data?.staffNode?.ownedOperationalIssues?.nodes || []
  }
}
