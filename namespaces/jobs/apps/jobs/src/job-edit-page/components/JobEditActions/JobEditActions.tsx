import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { DeleteJobModal, JobEditFragment } from '@staff-portal/jobs'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useNavigate } from '@staff-portal/navigation'
import { getJobPath } from '@staff-portal/routes'

export interface Props {
  job: JobEditFragment
}

const JobEditActions = ({ job: { id: jobId, status, operations } }: Props) => {
  const navigate = useNavigate()

  const onDeleteSuccess = () => navigate(getJobPath(decodeEntityId(jobId).id))

  const { showModal } = useModal(DeleteJobModal, {
    jobId,
    status,
    onSuccess: onDeleteSuccess
  })

  return (
    <Operation
      operation={operations.removeJob}
      render={disabled => (
        <Button
          disabled={disabled}
          onClick={showModal}
          size='small'
          variant='negative'
          data-testid='job-edit-actions-delete-job-button'
        >
          Delete Job
        </Button>
      )}
    />
  )
}

export default JobEditActions
