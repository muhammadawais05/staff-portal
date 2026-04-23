import { navigateExternallyTo } from '@staff-portal/navigation'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { useNotifications } from '@toptal/picasso/utils'

import { ERROR_MESSAGE } from '../../messages'

const SUCCESS_MESSAGE = 'Call started.'

const useProceedTopcall = () => {
  const { showError, showSuccess } = useNotifications()

  const proceedTopcall = ({
    errors,
    success,
    externalCallUrl
  }: {
    errors: { message: string }[]
    success: boolean
    externalCallUrl?: string | null
  }) => {
    if (!success) {
      showError(concatMutationErrors(errors) || ERROR_MESSAGE)

      return
    }

    if (externalCallUrl) {
      navigateExternallyTo(externalCallUrl) // Topcall disabled

      return
    }

    showSuccess(SUCCESS_MESSAGE) // Topcall enabled
  }

  return {
    proceedTopcall
  }
}

export default useProceedTopcall
