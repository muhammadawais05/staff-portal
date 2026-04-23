import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NodeType } from '@staff-portal/graphql'

import { UnlinkJobOpportunityDocument } from './data/unlink-job-opportunity.staff.gql.types'

type Props = {
  jobId: string
  hideModal: () => void
}

const UnlinkJobOpportunityModal = ({ jobId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [unlinkJobOpportunity, { loading }] = useMutation(
    UnlinkJobOpportunityDocument,
    {
      onError: () =>
        showError('An error occurred, the opportunity was not unlinked.')
    }
  )

  const handleSubmit = async (comment = '') => {
    const { data } = await unlinkJobOpportunity({
      variables: {
        input: {
          jobId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.unlinkJobOpportunity,
      successNotificationMessage: 'The opportunity was successfully unlinked.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return (
    <ConfirmationModal
      required
      variant='positive'
      placeholder='Please specify a reason.'
      title='Unlink Opportunity'
      submitText='Save Changes'
      textFieldName='comment'
      label='Comment'
      loading={loading}
      onClose={hideModal}
      onSubmit={handleSubmit}
      operationVariables={{
        nodeId: jobId,
        nodeType: NodeType.JOB,
        operationName: 'unlinkJobOpportunity'
      }}
    />
  )
}

export default UnlinkJobOpportunityModal
