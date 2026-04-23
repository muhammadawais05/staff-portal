import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetOperationalIssueEnabledCausesDocument } from './get-enabled-causes.staff.gql.types'
import { OPERATIONAL_ISSUE_CAUSE_FRAGMENT } from '../operational-issue-cause-fragment/operational-issue-cause-fragment.staff.gql'

export default gql`
  query GetOperationalIssueEnabledCauses($templateId: ID!) {
    node(id: $templateId) {
      ... on OperationalIssueTemplate {
        id
        enabledCauses {
          nodes {
            ...OperationalIssueCauseFragment
          }
          __typename
        }
        __typename
      }
    }
  }

  ${OPERATIONAL_ISSUE_CAUSE_FRAGMENT}
`
export const useGetOperationalIssueEnabledCauses = (templateId: string) => {
  const { data, loading } = useQuery(GetOperationalIssueEnabledCausesDocument, {
    variables: { templateId },
    fetchPolicy: 'cache-first'
  })

  return {
    // ToDo: Remove this when codegen is updated
    data: data?.node?.enabledCauses.nodes,
    loading
  }
}
