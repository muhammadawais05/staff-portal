import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUnlinkSourcingRequest } from './data/unlink-sourcing-request'

type Props = {
  sourcingTalentRequestId: string
  talentFullName: string
  onClose: () => void
}

const UnlinkSourcingRequestModal = ({
  sourcingTalentRequestId,
  talentFullName,
  onClose
}: Props) => {
  const { showError } = useNotifications()

  const { handleMutationResult } = useHandleMutationResult()
  const { unlinkSourcingRequestTalent, loading } = useUnlinkSourcingRequest({
    onError: () =>
      showError(`Unable to unlink sourced talent ${talentFullName}.`)
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await unlinkSourcingRequestTalent(
      sourcingTalentRequestId,
      comment
    )

    return handleMutationResult({
      mutationResult: data?.unlinkSourcingRequestTalent,
      successNotificationMessage: `The talent profile was successfully unlinked from the sourcing request.`,
      returnAllErrors: true
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      required
      variant='negative'
      onSubmit={handleSubmit}
      onClose={onClose}
      title={`Unlink ${talentFullName} from Sourcing Request`}
      submitText='Unlink'
      textFieldName='comment'
      label='Comment'
    />
  )
}

export default UnlinkSourcingRequestModal
