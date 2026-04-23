import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetExpiredCallTimersDocument } from './get-expired-call-timer-status-messages.staff.gql.types'
import { STATUS_MESSAGES_BATCH_KEY } from '../../constants'
import { EXPIRED_CALL_TIMER_MESSAGE_FRAGMENT } from '../expired-call-timer-message-fragment'

export const GET_EXPIRED_CALL_TIMERS: typeof GetExpiredCallTimersDocument = gql`
  query GetExpiredCallTimers {
    viewer {
      me {
        id
      }
      expiredCallTimers {
        nodes {
          id
          ...ExpiredCallTimerMessageFragment
        }
      }
    }
  }
  ${EXPIRED_CALL_TIMER_MESSAGE_FRAGMENT}
`

export const useGetExpiredCallTimerStatusMessages = ({
  onError
}: {
  onError: () => void
}) => {
  const { data, loading, error } = useQuery(GET_EXPIRED_CALL_TIMERS, {
    onError,
    fetchPolicy: 'network-only',
    context: { [BATCH_KEY]: STATUS_MESSAGES_BATCH_KEY }
  })

  return { data: data?.viewer.expiredCallTimers.nodes, loading, error }
}
