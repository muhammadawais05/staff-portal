import { CumulativeJobStatus } from '@staff-portal/graphql/staff'

import { JobAggregatedStatusesFragment } from '../../data/get-jobs-list'

export const jobStatusOptions = (
  statusCounters: JobAggregatedStatusesFragment
) => [
  {
    label: `Pending claim (${statusCounters.pendingClaim})`,
    value: CumulativeJobStatus.PENDING_CLAIM.toLocaleLowerCase()
  },
  {
    label: `Pending talent (${statusCounters.pendingEngineer})`,
    value: CumulativeJobStatus.PENDING_ENGINEER.toLocaleLowerCase(),
    highlightWhenChecked: true
  },
  {
    label: `Pending legal (${statusCounters.pendingLegal})`,
    value: CumulativeJobStatus.PENDING_LEGAL.toLocaleLowerCase()
  },
  {
    label: `Pending start (${statusCounters.pendingStart})`,
    value: CumulativeJobStatus.PENDING_START.toLocaleLowerCase()
  },
  {
    label: `On trial (${statusCounters.onTrial})`,
    value: CumulativeJobStatus.ON_TRIAL.toLocaleLowerCase()
  },
  {
    label: `On hold (${statusCounters.onHold})`,
    value: CumulativeJobStatus.ON_HOLD.toLocaleLowerCase()
  },
  {
    label: `Active (${statusCounters.active})`,
    value: CumulativeJobStatus.ACTIVE.toLocaleLowerCase()
  },
  {
    label: `On break (${statusCounters.onBreak})`,
    value: CumulativeJobStatus.ON_BREAK.toLocaleLowerCase()
  },
  {
    label: `End scheduled (${statusCounters.endScheduled})`,
    value: CumulativeJobStatus.END_SCHEDULED.toLocaleLowerCase()
  },
  {
    label: `Sending away (${statusCounters.sendingAway})`,
    value: CumulativeJobStatus.SENDING_AWAY.toLocaleLowerCase()
  },
  {
    label: `Postponed (${statusCounters.postponed})`,
    value: CumulativeJobStatus.POSTPONED.toLocaleLowerCase()
  },
  {
    label: `Deleted (${statusCounters.removed})`,
    value: CumulativeJobStatus.REMOVED.toLocaleLowerCase()
  }
]
