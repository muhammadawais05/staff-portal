import React, { useEffect } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'
import {
  ClaimCallRequestModal,
  CallRequestFragment,
  CallRequestListItem
} from '@staff-portal/clients-call-requests'

interface Props {
  data: CallRequestFragment
  shouldShowClaimCallRequestModal: boolean
}

const CallRequestItemView = ({
  data,
  shouldShowClaimCallRequestModal
}: Props) => {
  const { showError } = useNotifications()
  const { showModal } = useModal(ClaimCallRequestModal, {
    callRequestId: data.id
  })

  useEffect(() => {
    if (!shouldShowClaimCallRequestModal) {
      return
    }

    const {
      claimCallbackRequest,
      claimCallbackRequest: { messages: claimMessages },
      claimCallbackRequestWithClient
    } = data.operations

    if (
      !isOperationEnabled(claimCallbackRequest) &&
      !isOperationEnabled(claimCallbackRequestWithClient)
    ) {
      if (claimMessages.length) {
        for (const errorMessage of claimMessages) {
          showError(<span data-testid='claim-error'>{errorMessage}</span>)
        }
      } else {
        showError('This operation cannot be performed at this moment.')
      }

      return
    }

    showModal()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <CallRequestListItem data={data} />
}

export default CallRequestItemView
