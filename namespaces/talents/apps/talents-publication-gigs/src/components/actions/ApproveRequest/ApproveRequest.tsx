import React from 'react'
import { Button } from '@toptal/picasso/Button'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'

import { useApproveGigRequest } from '../../../data/approve-gig-request'

const SUCCESS_MESSAGE = 'Request approved successfully.'
const ERROR_MESSAGE = 'Unable to approve request'

type Props = {
  gigId: string
}

const ApproveRequest = ({ gigId }: Props) => {
  const { showError, showSuccess } = useNotifications()

  const [approveRequest, { loading }] = useApproveGigRequest({
    gigId,
    onCompleted: data => {
      const returnedErrors = data?.approveGig?.errors

      if (returnedErrors?.length) {
        const mutationErrorMessages = concatMutationErrors(
          returnedErrors,
          ERROR_MESSAGE
        )

        showError(mutationErrorMessages)
      }

      if (data?.approveGig?.success) {
        showSuccess(SUCCESS_MESSAGE)
      }
    },
    onError: () => {
      showError(ERROR_MESSAGE)
    }
  })

  const handleApproveRequest = () => {
    approveRequest()
  }

  return (
    <Button
      size='small'
      loading={loading}
      variant='positive'
      onClick={handleApproveRequest}
      data-testid='approveButton'
    >
      Approve
    </Button>
  )
}

export default ApproveRequest
