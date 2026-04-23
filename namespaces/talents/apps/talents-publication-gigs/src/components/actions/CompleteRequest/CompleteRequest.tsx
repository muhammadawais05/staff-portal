import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'

import { useCompleteGigRequest } from '../../../data/complete-gig-request'

const SUCCESS_MESSAGE = 'Request completed successfully.'
const ERROR_MESSAGE = 'Unable to complete request'

type Props = {
  gigId: string
  children: ReactNode
}

const CompleteRequest = ({ gigId, children }: Props) => {
  const { showError, showSuccess } = useNotifications()

  const [completeRequest] = useCompleteGigRequest({
    gigId,
    onCompleted: data => {
      const returnedErrors = data?.completeGig?.errors

      if (returnedErrors?.length) {
        const mutationErrorMessages = concatMutationErrors(
          returnedErrors,
          ERROR_MESSAGE
        )

        showError(mutationErrorMessages)
      }

      if (data?.completeGig?.success) {
        showSuccess(SUCCESS_MESSAGE)
      }
    },
    onError: () => {
      showError(ERROR_MESSAGE)
    }
  })

  const handleComplete = () => {
    completeRequest()
  }

  return (
    <div onClick={handleComplete} data-testid='complete-action'>
      {children}
    </div>
  )
}

export default CompleteRequest
