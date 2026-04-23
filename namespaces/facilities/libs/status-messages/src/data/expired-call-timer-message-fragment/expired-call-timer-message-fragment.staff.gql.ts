import { gql } from '@staff-portal/data-layer-service'
import { CALLABLE_CLIENT_FRAGMENT } from '@staff-portal/communication'

export const EXPIRED_CALL_TIMER_MESSAGE_FRAGMENT = gql`
  fragment ExpiredCallTimerMessageFragment on ExpiredCallTimer {
    client {
      ...CallableClientFragment
    }
  }

  ${CALLABLE_CLIENT_FRAGMENT}
`
