import { useStateWithLocalStorage } from '@staff-portal/local-storage-service'

import { HiddenStatusMessagesHandler } from '../../types'
import { StatusMessageFragment } from '../status-message-fragment'

export const STORAGE_KEY = 'hidden_status_messages'

export const useHandlePermanentlyHiddenGeneralStatusMessages =
  (): HiddenStatusMessagesHandler => {
    const [storedValue, setStoredValue] =
      useStateWithLocalStorage<string[]>(STORAGE_KEY)

    const hideMessage = ({ storeKey }: StatusMessageFragment) => {
      if (!storeKey) {
        throw new Error(
          'Status messages without store key should not be hidden permanently'
        )
      }

      const hiddenStatusMessages = [...(storedValue || []), storeKey]

      setStoredValue(hiddenStatusMessages)
    }

    const filterOutHiddenMessages = (statusMessages: StatusMessageFragment[]) =>
      statusMessages.filter(({ storeKey }) => {
        if (!storeKey) {
          return true
        }

        const messages = (storedValue || []) as string[]

        return !messages.includes(storeKey)
      })

    return { hideMessage, filterOutHiddenMessages }
  }
