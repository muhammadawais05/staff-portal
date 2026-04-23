import React, { useState, useEffect } from 'react'
import { Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { StatusMessageNotification } from '@staff-portal/ui'
import {
  UNSAVED_NOTES_UPDATED,
  useNoteNotifications
} from '@staff-portal/notes'
import { CustomStatusMessageOptions } from '@staff-portal/page-wrapper'

import { useHandleVisibleGeneralStatusMessages } from '../../hooks'
import { useHandleVisibleExpiredCallTimerStatusMessages } from '../../hooks/use-handle-visible-expired-call-timer-status-messages'
import GeneralStatusMessage from '../GeneralStatusMessage/GeneralStatusMessage'
import ExpiredCallTimerStatusMessage from '../ExpiredCallTimerStatusMessage/ExpiredCallTimerStatusMessage'
import UnfilledCallsStatusMessage from '../UnfilledCallsStatusMessage'
import UnsavedNotesNotification from '../UnsavedNotesNotification'
import { compareStickyFirst } from './utils/compare-sticky-first'
import AuthorizeGmailNotification from '../AuthorizeGmailNotification/AuthorizeGmailNotification'

const StatusMessages = ({
  customStatusMessages
}: {
  customStatusMessages?: CustomStatusMessageOptions[]
}) => {
  const { showError } = useNotifications()
  const { generalStatusMessages, hideGeneralStatusMessage } =
    useHandleVisibleGeneralStatusMessages({
      onError: () => showError('Error loading status messages.')
    })
  const sortedGeneralStatusMessages = [...generalStatusMessages]

  sortedGeneralStatusMessages.sort(compareStickyFirst)

  const { expiredCallTimerStatusMessages, hideExpiredCallTimerMessage } =
    useHandleVisibleExpiredCallTimerStatusMessages({
      onError: () => showError('Error loading expired call timer messages.')
    })

  const { getNoteLinks } = useNoteNotifications()
  const [noteLinks, setNoteLinks] = useState(getNoteLinks())

  useMessageListener(UNSAVED_NOTES_UPDATED, ({ links }) => setNoteLinks(links))

  // sync up with the changes in local storage when switching browser tabs
  useEffect(() => {
    const syncMessages = () => {
      setNoteLinks(getNoteLinks())
    }

    document.addEventListener('visibilitychange', syncMessages)

    return () => {
      document.removeEventListener('visibilitychange', syncMessages)
    }
  }, [getNoteLinks])

  const unfilledCallStatusMessage = <UnfilledCallsStatusMessage />
  const authorizeGmailNotification = <AuthorizeGmailNotification />

  const showMessages =
    generalStatusMessages.length ||
    expiredCallTimerStatusMessages.length ||
    Object.keys(noteLinks).length ||
    customStatusMessages?.length ||
    !!unfilledCallStatusMessage ||
    !!authorizeGmailNotification

  if (!showMessages) {
    return null
  }

  return (
    <Container bottom='medium' data-testid='status-messages'>
      {sortedGeneralStatusMessages.map(generalStatusMessage => (
        <GeneralStatusMessage
          key={generalStatusMessage.text}
          data={generalStatusMessage}
          onClose={hideGeneralStatusMessage}
        />
      ))}
      {unfilledCallStatusMessage}
      {expiredCallTimerStatusMessages.map(expiredCallTimerStatusMessage => (
        <ExpiredCallTimerStatusMessage
          key={expiredCallTimerStatusMessage.client.id}
          data={expiredCallTimerStatusMessage}
          onClose={hideExpiredCallTimerMessage}
        />
      ))}
      <UnsavedNotesNotification noteLinks={noteLinks} />
      {customStatusMessages?.map(config => (
        <StatusMessageNotification
          key={config.id}
          variant={config.variant}
          onClose={config.handleOnClose}
        >
          {config.content}
        </StatusMessageNotification>
      ))}
      {authorizeGmailNotification}
    </Container>
  )
}

export default StatusMessages
