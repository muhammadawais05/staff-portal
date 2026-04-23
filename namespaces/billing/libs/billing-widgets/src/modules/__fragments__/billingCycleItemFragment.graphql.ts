import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export const billingCycleItemFragment = gql`
  fragment BillingCycleItemFragment on BillingCycle {
    breaksPeriod
    endDate
    gid
    id
    hours
    chargedHours
    kind
    minimumCommitment {
      applicable
      minimumHours
      reasonNotApplicable
    }
    startDate
    status
    timesheetApproved
    timesheetComment
    timesheetOverdue
    timesheetRecords {
      date
      duration
      note
    }
    timesheetRejected
    timesheetRejectionComment
    timesheetRequiresApproval
    timesheetSubmissionBlocked
    timesheetSubmissionDeadline
    timesheetSubmitted
    timesheetExtraHours
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

  ${operationItemFragment}
`
