import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useNavigate } from '@staff-portal/navigation'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useDeleteOpportunity } from './data'

export interface Props {
  opportunityId: string
  onClose: () => void
}

const DeleteOpportunityModal = ({ opportunityId, onClose }: Props) => {
  const navigate = useNavigate()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [deleteOpportunity, { loading }] = useDeleteOpportunity({
    onCompleted: data => {
      if (data.deleteOpportunity?.success) {
        navigate('/opportunities')
      }
    },
    onError: () =>
      showError('An error occurred, the Opportunity was not deleted.')
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await deleteOpportunity({
      variables: {
        input: {
          opportunityId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.deleteOpportunity,
      successNotificationMessage: 'The Opportunity was successfully deleted.',
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
      title='Delete Opportunity?'
      submitText='Delete'
      placeholder='Please specify a reason.'
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
}

export default DeleteOpportunityModal
