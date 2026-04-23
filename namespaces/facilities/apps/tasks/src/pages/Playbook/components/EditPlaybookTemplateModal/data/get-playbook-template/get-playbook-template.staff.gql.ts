import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetPlaybookTemplate($playbookTemplateId: ID!) {
    node(id: $playbookTemplateId) {
      ...PlaybookTemplateEditFragment
    }
  }

  fragment PlaybookTemplateEditFragment on PlaybookTemplate {
    id
    description
    details
    recurring
    stopRecurringAfterDispute
    dueDateRuleAmount
    dueDateRuleUnit
    priority
    finishDisabled
    rescheduleDisabled
    communication
    important
    slackNotificationsEnabled
  }
`
