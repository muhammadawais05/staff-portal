import { useStateWithLocalStorage } from '@staff-portal/local-storage-service'

import { ExpiredCallTimerMessageFragment } from '../expired-call-timer-message-fragment'

export const STORAGE_KEY = 'hidden_expired_call_timers'

export const useHandleHiddenExpiredCallTimerStatusMessages = () => {
  const [storedValue, setStoredValue] =
    useStateWithLocalStorage<string[]>(STORAGE_KEY)
  const hideExpiredCallTimerMessage = ({
    client: { id }
  }: ExpiredCallTimerMessageFragment) =>
    setStoredValue([...(storedValue || []), id])

  const filterOutHiddenExpiredCallTimers = (
    expiredCallTimers: ExpiredCallTimerMessageFragment[]
  ) =>
    expiredCallTimers.filter(({ client: { id } }) => !storedValue?.includes(id))

  return { hideExpiredCallTimerMessage, filterOutHiddenExpiredCallTimers }
}
