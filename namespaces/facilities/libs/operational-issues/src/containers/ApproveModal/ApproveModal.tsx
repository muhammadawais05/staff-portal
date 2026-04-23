import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useApproveOperationalIssue } from './data/approve-operational-issue/approve-operational-issue.staff.gql'

interface Props {
  operationalIssueId: string
  onClose: () => void
}

const ApproveModal = ({ operationalIssueId, onClose }: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [approveOperationalIssue, { loading }] = useApproveOperationalIssue()

  const handleSubmit = async (comment = '') => {
    const { data } = await approveOperationalIssue({
      variables: {
        operationalIssueId,
        comment
      }
    })

    return handleMutationResult({
      mutationResult: data?.approveOperationalIssue,
      successNotificationMessage: 'Operational issue has been approved.',
      onSuccessAction: onClose
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      variant='positive'
      message='Are you sure you want to approve this operational issue?'
      title='Approve Operational issue'
      placeholder='Please specify a reason'
      submitText='Approve'
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}

export default ApproveModal
