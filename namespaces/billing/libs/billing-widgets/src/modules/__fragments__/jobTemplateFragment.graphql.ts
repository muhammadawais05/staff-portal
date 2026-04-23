import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export const jobTemplateFragment = gql`
  fragment JobTemplateFragment on JobTemplate {
    billCycle
    billDay
    commitment
    id
    operations {
      updateJobTemplate {
        ...OperationItem
      }
      deleteJobTemplate {
        ...OperationItem
      }
    }
  }

  ${operationItemFragment}
`
