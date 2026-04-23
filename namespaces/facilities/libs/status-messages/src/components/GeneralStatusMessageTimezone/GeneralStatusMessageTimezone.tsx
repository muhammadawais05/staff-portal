import React from 'react'
import { Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { getUpdateProfilePath } from '@staff-portal/routes'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { StatusMessageNotification } from '@staff-portal/ui'

import { StatusMessageFragment } from '../../data/status-message-fragment'
import { getCurrentTimezoneSettings } from '../../utils'
import { useUpdateViewerTimezone } from '../../data/update-viewer-timezone'
import * as S from './styles'

const DETECTED_TIMEZONE_KEY = 'detected'
const SETTINGS_TIMEZONE_KEY = 'current'

const getContentTimezoneSet = ({
  onActionClick,
  settingsTimeZoneValue,
  detectedTimeZoneValue
}: {
  onActionClick: () => void
  settingsTimeZoneValue?: string
  detectedTimeZoneValue?: string
}) => {
  const { timezoneName } = getCurrentTimezoneSettings()

  if (timezoneName) {
    return (
      <>
        The time zone in your profile is set to {settingsTimeZoneValue}, but
        we've detected a change to {detectedTimeZoneValue}.{' '}
        <Link onClick={onActionClick} css={S.noWrap}>
          Save local time zone
        </Link>
      </>
    )
  }

  return (
    <>
      We detected that your time zone differs from the one in your profile,
      please{' '}
      <Link href={getUpdateProfilePath()} css={S.noWrap}>
        update your time zone
      </Link>
      .
    </>
  )
}

const getContentTimezoneUnset = ({
  onActionClick,
  detectedTimeZoneValue
}: {
  onActionClick: () => void
  detectedTimeZoneValue?: string
}) => {
  const { timezoneName } = getCurrentTimezoneSettings()

  if (timezoneName) {
    return (
      <>
        You have not defined a time zone in your profile, but we've detected it
        to be {detectedTimeZoneValue}.{' '}
        <Link onClick={onActionClick} css={S.noWrap}>
          Save local time zone
        </Link>
        .
      </>
    )
  }

  return (
    <>
      We couldn't detect your local time zone. Please{' '}
      <Link href={getUpdateProfilePath()} css={S.noWrap}>
        set it in your profile
      </Link>
      .
    </>
  )
}

const getUpdatedTimeZoneMessage = (timeZone?: string) => (
  <>
    Your time zone was updated to {timeZone}. You can always change it in{' '}
    <Link href={getUpdateProfilePath()} css={S.noWrap}>
      your profile.
    </Link>
  </>
)

interface Props {
  statusMessage: StatusMessageFragment
  onClose: Function
}

const GeneralStatusMessageTimezone = ({ statusMessage, onClose }: Props) => {
  const { showSuccess, showError } = useNotifications()
  const { updateViewerTimezone } = useUpdateViewerTimezone({
    onCompleted: ({ updateViewerTimeZone }) => {
      if (updateViewerTimeZone?.errors.length) {
        return showError(concatMutationErrors(updateViewerTimeZone?.errors))
      }

      const timeZone = updateViewerTimeZone?.viewer?.me.timeZone

      showSuccess(getUpdatedTimeZoneMessage(timeZone?.name))
    },
    onError: () => showError('Error occurred when updating user timezone.')
  })

  const saveLocalTimezone = () => {
    onClose(statusMessage)
    updateViewerTimezone()
  }

  const { storeKey, data: messageData } = statusMessage
  const detectedTimeZone = messageData.find(
    ({ key }) => key === DETECTED_TIMEZONE_KEY
  )
  const settingsTimeZone = messageData.find(
    ({ key }) => key === SETTINGS_TIMEZONE_KEY
  )

  const userTimezoneIsDefined = Boolean(
    !storeKey?.startsWith('wrong_time_zone_undefined')
  )

  return (
    <StatusMessageNotification
      variant='yellow'
      onClose={() => onClose(statusMessage)}
    >
      <Typography color='black'>
        {userTimezoneIsDefined
          ? getContentTimezoneSet({
              onActionClick: saveLocalTimezone,
              settingsTimeZoneValue: settingsTimeZone?.value,
              detectedTimeZoneValue: detectedTimeZone?.value
            })
          : getContentTimezoneUnset({
              onActionClick: saveLocalTimezone,
              detectedTimeZoneValue: detectedTimeZone?.value
            })}
      </Typography>
    </StatusMessageNotification>
  )
}

export default GeneralStatusMessageTimezone
