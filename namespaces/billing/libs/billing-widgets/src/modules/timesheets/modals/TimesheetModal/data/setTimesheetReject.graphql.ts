import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation SetTimesheetReject($billingCycleId: ID!, $comment: String!) {
    rejectTimesheet(billingCycleId: $billingCycleId, comment: $comment) {
      billingCycle {
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
        gid
        id
        timesheetRejected
        timesheetRejectionComment
        timesheetOverdue
      }
      success
      errors {
        code
        key
        message
      }
    }
  }

  ${operationItemFragment}
`
