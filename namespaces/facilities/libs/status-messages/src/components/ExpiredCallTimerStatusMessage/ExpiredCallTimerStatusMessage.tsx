import React from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { StatusMessageNotification } from '@staff-portal/ui'
import { CallClientModal } from '@staff-portal/communication'

import { ExpiredCallTimerMessageFragment } from '../../data/expired-call-timer-message-fragment'

interface Props {
  data: ExpiredCallTimerMessageFragment
  onClose: Function
}

const ExpiredCallTimerStatusMessage = ({ data, onClose }: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  const hideMessage = () => onClose(data)

  return (
    <>
      {isOpen && (
        <CallClientModal
          client={data.client}
          onCompleted={hideMessage}
          hideModal={hideModal}
        />
      )}
      <StatusMessageNotification variant='yellow' onClose={hideMessage}>
        Please call{' '}
        <Link variant='action' onClick={showModal}>
          {data.client.fullName}
        </Link>{' '}
        immediately.
      </StatusMessageNotification>
    </>
  )
}

export default ExpiredCallTimerStatusMessage
