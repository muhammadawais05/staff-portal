import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation SetTimesheetUnsubmit($billingCycleId: ID!, $comment: String!) {
    unsubmitTimesheet(billingCycleId: $billingCycleId, comment: $comment) {
      billingCycle {
        gid
        id
        timesheetSubmitted
        timesheetOverdue
        operations {
          timesheetApprove {
            ...OperationItem
          }
          timesheetReject {
            ...OperationItem
          }
          timesheetSubmit {
            ...OperationItem
          }
          timesheetUnsubmit {
            ...OperationItem
          }
          timesheetUpdate {
            ...OperationItem
          }
        }
      }
      success
      errors {
        key
        message
        code
      }
    }
  }

  ${operationItemFragment}
`
