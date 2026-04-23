import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { StatusMessageNotification } from '@staff-portal/ui'
import { useHandleGoogleAppsAuthNotification } from '@staff-portal/communication'

const GoogleAppsAuthNotification = () => {
  const {
    authUrl,
    hasAuthorizedMailboxes,
    isAllowedToManageMailboxes,
    belongsToAtLeastOneTeamWithEmailTrackingEnabled
  } = useHandleGoogleAppsAuthNotification()

  if (
    !isAllowedToManageMailboxes ||
    !belongsToAtLeastOneTeamWithEmailTrackingEnabled
  ) {
    return null
  }

  return (
    <Container top='small' data-testid='google-apps-notification'>
      <StatusMessageNotification variant='yellow'>
        {!hasAuthorizedMailboxes && authUrl ? (
          <Typography color='black' weight='regular' inline>
            Please{' '}
            <Link href={authUrl} variant='action'>
              authorize
            </Link>{' '}
            your Toptal Google Apps account or this email will be sent via
            platform.
          </Typography>
        ) : (
          <Typography color='black' weight='regular'>
            This email will be sent via your Gmail account.
          </Typography>
        )}
      </StatusMessageNotification>
    </Container>
  )
}

export default GoogleAppsAuthNotification
