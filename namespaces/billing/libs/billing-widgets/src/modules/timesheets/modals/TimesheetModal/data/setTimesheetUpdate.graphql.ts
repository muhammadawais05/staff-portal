import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  mutation SetTimesheetUpdate(
    $billingCycleId: ID!
    $comment: String
    $timesheetRecords: [TimesheetRecordsInput!]!
  ) {
    updateTimesheet(
      billingCycleId: $billingCycleId
      timesheetRecords: $timesheetRecords
      comment: $comment
    ) {
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
        timesheetComment
        timesheetRecords {
          date
          duration
          note
        }
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
