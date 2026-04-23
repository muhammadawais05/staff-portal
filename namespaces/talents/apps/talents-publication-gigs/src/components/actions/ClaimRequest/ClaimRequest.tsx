import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'

import { useClaimGigRequest } from '../../../data/claim-gig-request'

const SUCCESS_MESSAGE = 'Request claimed successfully.'
const ERROR_MESSAGE = 'Unable to claim request'

type Props = {
  gigId: string
}

const ClaimRequest = ({ gigId }: Props) => {
  const { showError, showSuccess } = useNotifications()

  const [claimRequest, { loading: claimLoading }] = useClaimGigRequest({
    gigId,
    onCompleted: data => {
      const returnedErrors = data?.claimGig?.errors

      if (returnedErrors?.length) {
        const mutationErrorMessages = concatMutationErrors(
          returnedErrors,
          ERROR_MESSAGE
        )

        showError(mutationErrorMessages)
      }

      if (data?.claimGig?.success) {
        showSuccess(SUCCESS_MESSAGE)
      }
    },
    onError: () => {
      showError(ERROR_MESSAGE)
    }
  })

  const handleClaim = () => {
    claimRequest()
  }

  return (
    <Button
      size='small'
      onClick={handleClaim}
      loading={claimLoading}
      data-testid='claimButton'
    >
      Claim
    </Button>
  )
}

export default ClaimRequest
