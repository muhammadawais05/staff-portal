import { ReactNode } from 'react'
import { ApolloError } from '@apollo/client'
import { useNotifications } from '@toptal/picasso/utils'
import { useTranslation } from 'react-i18next'
import {
  useMessageEmitter,
  TypedMessage
} from '@toptal/staff-portal-message-bus'

import { HandleOutboundEventName } from '../../../@types/types'
import { useExternalIntegratorContext } from '../../context/externalIntegratorContext'
import { useModals } from '../useModals'

export interface HandleOnSuccess {
  apolloEvent?: TypedMessage<any>
  isModal?: boolean
  outboundEvent?: {
    key: HandleOutboundEventName
    payload?: Record<string, unknown>
  }
  successMessage?: ReactNode
  successMessageOptions?: {
    persist?: boolean
  }
}

const isMessageBusEvent = (
  eventName: HandleOutboundEventName
): eventName is TypedMessage<any> => typeof eventName !== 'string'

const useFormSubmission = () => {
  const { showError, showSuccess } = useNotifications()
  const { t: translate } = useTranslation('common')
  const { handleOutboundEventEmit } = useExternalIntegratorContext()
  const { handleOnCloseModal } = useModals()
  const emitMessage = useMessageEmitter()

  const handleOnError = ({
    message,
    graphQLErrors,
    networkError
  }: ApolloError) => {
    if (message) {
      showError(message)
    } else if (graphQLErrors?.length) {
      graphQLErrors.forEach(({ message: GQLMessage }) => showError(GQLMessage))
    } else if (networkError) {
      showError(networkError.message)
    }
  }

  const handleOnRootLevelError = (error: ApolloError) => {
    showError(error?.message || translate('validation.permissionError'))
  }

  const handleOnSuccess =
    ({
      apolloEvent,
      isModal = true,
      outboundEvent,
      successMessage,
      successMessageOptions
    }: HandleOnSuccess) =>
    () => {
      if (successMessage) {
        showSuccess(successMessage, undefined, successMessageOptions)
      }
      if (isModal) {
        handleOnCloseModal()
      }
      if (outboundEvent) {
        handleOutboundEventEmit(
          isMessageBusEvent(outboundEvent.key)
            ? outboundEvent.key.metaData
            : outboundEvent.key,
          outboundEvent.payload || {}
        )
      }
      if (apolloEvent) {
        emitMessage(apolloEvent)
      }
    }

  return {
    handleOnError,
    handleOnRootLevelError,
    handleOnSuccess
  }
}

export default useFormSubmission
