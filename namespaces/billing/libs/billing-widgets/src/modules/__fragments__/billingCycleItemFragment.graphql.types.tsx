/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();

import * as Types from '@staff-portal/graphql/staff';

import { OperationItemFragment } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
import { gql } from '@apollo/client';
import { OperationItemFragmentDoc } from '../../../../billing/src/__fragments__/operationItemFragment.graphql.types';
export type BillingCycleItemFragment = { breaksPeriod: Array<`${`${number}-${number}-${number}`}` | ''>, endDate: `${`${number}-${number}-${number}`}` | '', gid: string, id: string, hours: string, chargedHours: string, kind: Types.BillingCycleKind, startDate: `${`${number}-${number}-${number}`}` | '', status: Types.BillingCycleStatus, timesheetApproved: boolean, timesheetComment?: Types.Maybe<string>, timesheetOverdue: boolean, timesheetRejected: boolean, timesheetRejectionComment?: Types.Maybe<string>, timesheetRequiresApproval: boolean, timesheetSubmissionBlocked: boolean, timesheetSubmissionDeadline: `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`, timesheetSubmitted: boolean, timesheetExtraHours: boolean, minimumCommitment?: Types.Maybe<{ applicable: boolean, minimumHours: number, reasonNotApplicable?: Types.Maybe<Types.MinimumCommitmentInapplicableReasonEnum> }>, timesheetRecords: Array<{ date: `${`${number}-${number}-${number}`}` | '', duration?: Types.Maybe<string>, note?: Types.Maybe<string> }>, operations: { timesheetApprove: OperationItemFragment, timesheetReject: OperationItemFragment, timesheetSubmit: OperationItemFragment, timesheetUnsubmit: OperationItemFragment, timesheetUpdate: OperationItemFragment } };

export const BillingCycleItemFragmentDoc = gql`
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
    ${OperationItemFragmentDoc}`;