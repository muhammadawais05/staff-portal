import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const PLAYBOOK_FRAGMENT = gql`
  fragment PlaybookFragment on Playbook {
    identifier
    label
    templates {
      nodes {
        ...PlaybookTemplateFragment
      }
      totalCount
    }
  }
`
export const PLAYBOOK_TEMPLATE_FRAGMENT = gql`
  fragment PlaybookTemplateFragment on PlaybookTemplate {
    id
    identifier
    description
    details
    dueDateRuleUnit
    dueDateRuleAmount
    priority
    recurring
    flowLink {
      text
      url
    }
    webResource {
      url
    }
    operations {
      updatePlaybookTemplate {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
