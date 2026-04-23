import { useNotifications } from '@toptal/picasso/utils'
import pluralize from 'pluralize'
import React, { useCallback, useEffect, useState } from 'react'
import { useInterval } from 'use-interval'
import { VisualComplianceStatus } from '@staff-portal/graphql/staff'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useCustomStatusMessagesContext } from '@staff-portal/page-wrapper'

import { GetCheckComplianceStatusQuery } from './data/get-check-compliance-status'
import { CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID } from '../../../../config'
import { CLIENT_UPDATED } from '../../../../messages'
import { NO_POLL, POLL_INTERVAL, TIMER_UPDATE_INTERVAL } from './constants'
import { useGetCheckComplianceStatus } from './data'

interface Props {
  companyName: string
  companyId: string
}

const CheckComplianceInProgressMessage = ({
  companyName,
  companyId
}: Props) => {
  const [seconds, setSeconds] = useState(0)
  const [pollInterval, setPollInterval] = useState(POLL_INTERVAL)
  const { showError, showSuccess } = useNotifications()
  const { removeStatusMessage } = useCustomStatusMessagesContext()
  const emitMessage = useMessageEmitter()

  const destroy = useCallback(() => {
    setPollInterval(NO_POLL)
    removeStatusMessage(CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID)
  }, [setPollInterval, removeStatusMessage])

  useGetCheckComplianceStatus({
    clientId: companyId,
    // Delay the query for those cases when the response comes too quickly and the message disappears instantly
    skip: seconds < 3,
    pollInterval,
    onError: () => {
      showError(`${companyName} did not pass the compliance check.`)
      destroy()
    },
    onCompleted: (data: GetCheckComplianceStatusQuery) => {
      if (
        data.node?.visualComplianceStatus ===
        VisualComplianceStatus.FULLY_CHECKED
      ) {
        if (!data.node?.ofacProhibited) {
          showSuccess(`${companyName} has passed the compliance check.`)
        } else {
          showError(`${companyName} did not pass the compliance check.`)
        }
        destroy()
        emitMessage(CLIENT_UPDATED, { companyId })
      }
    }
  })

  useEffect(() => destroy, [destroy])

  useInterval(
    () => setSeconds(prevState => prevState + 1),
    TIMER_UPDATE_INTERVAL
  )

  return (
    <>
      Checking compliance for {companyName}... {seconds}{' '}
      {pluralize('second', seconds)}
    </>
  )
}

export default CheckComplianceInProgressMessage
