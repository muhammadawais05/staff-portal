import React, { useMemo } from 'react'
import { MoreButton } from '@staff-portal/ui'
import { Menu } from '@toptal/picasso'
import {
  Operation,
  checkIfAllOperationsAreHidden
} from '@staff-portal/operations'

import useGetJobActions from '../../utils/use-get-job-actions'
import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'

interface Props {
  job: ClientJobFragment
}

const JobActionsButton = ({ job }: Props) => {
  const { operations } = job
  const {
    showDeleteJobModal,
    showPostponeJobModal,
    showRestorePostponeModal,
    showRestoreSendingAwayModal,
    showSendJobAwayModal
  } = useGetJobActions({
    jobId: job.id,
    status: job.status
  })

  const isAllOperationsAreHidden = useMemo(
    () => checkIfAllOperationsAreHidden(operations),
    [operations]
  )

  return (
    <MoreButton hidden={isAllOperationsAreHidden} fullHeight disablePopper>
      <Operation
        operation={operations?.removeJob}
        render={disabled => (
          <Menu.Item
            disabled={disabled}
            onClick={showDeleteJobModal}
            data-testid='job-action-item-delete'
          >
            Delete
          </Menu.Item>
        )}
        inline={false}
      />
      <Operation
        operation={operations?.postponeJob}
        render={disabled => (
          <Menu.Item
            disabled={disabled}
            onClick={showPostponeJobModal}
            data-testid='job-action-item-postpone'
          >
            Postpone job
          </Menu.Item>
        )}
        inline={false}
      />
      <Operation
        operation={operations?.sendJobAway}
        render={disabled => (
          <Menu.Item
            disabled={disabled}
            onClick={showSendJobAwayModal}
            data-testid='job-action-item-send-away'
          >
            Send Away Job
          </Menu.Item>
        )}
        inline={false}
      />
      <Operation
        operation={operations?.resumePostponedJob}
        render={disabled => (
          <Menu.Item
            disabled={disabled}
            onClick={showRestorePostponeModal}
            data-testid='job-action-item-restore-postpone'
          >
            Restore Postponed
          </Menu.Item>
        )}
        inline={false}
      />
      <Operation
        operation={operations?.resumeSendingJobAway}
        render={disabled => (
          <Menu.Item
            disabled={disabled}
            onClick={showRestoreSendingAwayModal}
            data-testid='job-action-item-restore-send-away'
          >
            Restore Sending Away
          </Menu.Item>
        )}
        inline={false}
      />
    </MoreButton>
  )
}

export default JobActionsButton
