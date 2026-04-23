import { useGetExpiredCallTimerStatusMessages } from '../data/get-expired-call-timer-status-messages'
import { useHandleHiddenExpiredCallTimerStatusMessages } from '../data/handle-hidden-expired-call-timer-status-messages'

export const useHandleVisibleExpiredCallTimerStatusMessages = ({
  onError
}: {
  onError: () => void
}) => {
  const { data = [] } = useGetExpiredCallTimerStatusMessages({ onError })
  const {
    filterOutHiddenExpiredCallTimers,
    hideExpiredCallTimerMessage
  } = useHandleHiddenExpiredCallTimerStatusMessages()
  const filteredExpiredCallTimers = filterOutHiddenExpiredCallTimers(data)

  return {
    expiredCallTimerStatusMessages: filteredExpiredCallTimers,
    hideExpiredCallTimerMessage
  }
}
