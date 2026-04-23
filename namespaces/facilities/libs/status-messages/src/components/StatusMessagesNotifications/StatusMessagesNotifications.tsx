import React, { useMemo, useState } from 'react'
import { Container } from '@toptal/picasso'
import {
  StatusMessageSeverity,
  StatusMessageTag
} from '@staff-portal/graphql/staff'

import { StatusMessageFragment } from '../../data/status-message-fragment'
import GeneralStatusMessageDefault from '../GeneralStatusMessageDefault/GeneralStatusMessageDefault'

interface Props {
  statusMessages?: StatusMessageFragment[]
}

const isPmbvNotice = (statusMessage: StatusMessageFragment) =>
  statusMessage.tag === StatusMessageTag.CLIENT_PMBV_NOTICE

const StatusMessagesNotifications = ({ statusMessages }: Props) => {
  const [hiddenMessages, setHiddenMessages] = useState<StatusMessageFragment[]>(
    []
  )

  const pmbvNotice = statusMessages?.find(isPmbvNotice)

  const filteredMessages = useMemo(
    () =>
      statusMessages?.filter(
        statusMessage =>
          !hiddenMessages.includes(statusMessage) &&
          !isPmbvNotice(statusMessage)
      ),
    [statusMessages, hiddenMessages]
  )

  const handleClose = async (statusMessage: StatusMessageFragment) => {
    setHiddenMessages([...hiddenMessages, statusMessage])
    if (statusMessage.tag === StatusMessageTag.CLIENT_COMPANY_WAS_RENAMED) {
      await fetch(statusMessage.closeUrl as string, {
        method: 'POST'
      })
    }
  }

  if (!filteredMessages?.length && !pmbvNotice) {
    return null
  }

  return (
    <Container data-testid='status-messages-container' bottom='small'>
      {!!pmbvNotice && (
        <GeneralStatusMessageDefault
          key={pmbvNotice.tag}
          statusMessage={{
            ...pmbvNotice,
            severity: StatusMessageSeverity.ALERT
          }}
          onClose={() => {}}
        />
      )}
      {filteredMessages?.map(statusMessage => (
        <GeneralStatusMessageDefault
          key={statusMessage.tag}
          statusMessage={statusMessage}
          onClose={handleClose.bind(statusMessage)}
        />
      ))}
    </Container>
  )
}

export default StatusMessagesNotifications
