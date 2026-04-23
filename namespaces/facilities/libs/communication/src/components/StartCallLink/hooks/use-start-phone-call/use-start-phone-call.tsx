import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { isNotNullish } from '@staff-portal/utils'

import { useStartCall } from '../../data/start-call'

const SUCCESS_MESSAGE = 'Call started.'
const ERROR_MESSAGE = 'Unable to call contact.'

const useStartPhoneCall = () => {
  const { showError, showSuccess } = useNotifications()

  const [startCall, { loading }] = useStartCall({
    onError: () => {
      showError(ERROR_MESSAGE)
    },
    onCompleted: data => {
      if (!data.startCall) {
        return
      }
      const { errors, success, notice } = data.startCall

      if (!success && isNotNullish(notice)) {
        showError(notice)

        return
      }

      if (!success) {
        showError(concatMutationErrors(errors) || ERROR_MESSAGE)

        return
      }

      showSuccess(SUCCESS_MESSAGE) // Topcall enabled
    }
  })

  const startPhoneCall = (phoneNumber: string) => {
    startCall({
      variables: {
        input: { phoneNumber }
      }
    })
  }

  return {
    loading,
    startPhoneCall
  }
}

export default useStartPhoneCall
