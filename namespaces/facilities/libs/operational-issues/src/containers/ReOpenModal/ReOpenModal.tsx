import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useReOpenOperationalIssue } from './data/re-open-operational-issue/re-open-operational-issue.staff.gql'

export interface Props {
  operationalIssueId: string
  onClose: () => void
}

const ReOpenModal = ({
  operationalIssueId,
  onClose
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [reOpenOperationalIssue, { loading }] = useReOpenOperationalIssue({
    onError: () =>
      showError(
        'An error occurred, the Operational issue has not been re-opened.'
      )
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await reOpenOperationalIssue({
      variables: {
        input: {
          operationalIssueId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.reopenOperationalIssue,
      successNotificationMessage: 'Operational issue has been re-opened.',
      onSuccessAction: onClose
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      variant='negative'
      required
      textFieldName='comment'
      label='Comment'
      message='Please provide a reason below explaining why you are re-opening the operational issue'
      title='Re-Open Operational issue'
      placeholder='Please specify a reason'
      submitText='Re-Open'
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}

export default ReOpenModal
