import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation SetTimesheetSubmit($billingCycleId: ID!) {
    submitTimesheet(billingCycleId: $billingCycleId) {
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
        timesheetSubmitted
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
