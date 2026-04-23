import { ApolloError, gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetOperationalIssuesStaffTreeDocument,
  GetOperationalIssuesStaffTreeQuery
} from './get-operational-issues-staff-tree.staff.gql.types'

export const GET_OPERATIONAL_ISSUES_STAFF_TREE: typeof GetOperationalIssuesStaffTreeDocument = gql`
  query GetOperationalIssuesStaffTree {
    operationalIssuesStaffTree {
      nodes {
        ...OperationalIssuesStaffTreeCardNodeFragment
        ...OperationalIssuesStaffTreeTeamNodeFragment
      }
    }
  }

  fragment OperationalIssuesStaffTreeCardNodeFragment on OperationalIssuesStaffTreeCardNode {
    issuesCount
    parentIndex
    positions
    role {
      ...OperationalIssuesStaffTreeRole
    }
  }

  fragment OperationalIssuesStaffTreeTeamNodeFragment on OperationalIssuesStaffTreeTeamNode {
    members {
      edges {
        issuesCount
        node {
          ...OperationalIssuesStaffTreeRole
        }
      }
    }
    name
    parentIndex
  }

  fragment OperationalIssuesStaffTreeRole on Role {
    id
    fullName
    photo {
      thumb
    }
  }
`

export const useGetOperationalIssuesStaffTree = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: GetOperationalIssuesStaffTreeQuery) => void
  onError: (error: ApolloError) => void
}) => {
  const { data, error, loading } = useQuery(GET_OPERATIONAL_ISSUES_STAFF_TREE, {
    onCompleted,
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    error,
    loading,
    data: data?.operationalIssuesStaffTree.nodes
  }
}
