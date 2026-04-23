import React from 'react'
import { Container } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { StatusMessageNotification } from '@staff-portal/ui'
import { useHandleGoogleAppsAuthNotification } from '@staff-portal/communication'

const AuthorizeGmailNotification = () => {
  const {
    authUrl,
    hasAuthorizedMailboxes,
    isAllowedToManageMailboxes,
    belongsToAtLeastOneTeamWithEmailTrackingEnabled
  } = useHandleGoogleAppsAuthNotification()

  if (
    !authUrl ||
    !isAllowedToManageMailboxes ||
    !belongsToAtLeastOneTeamWithEmailTrackingEnabled ||
    hasAuthorizedMailboxes
  ) {
    return null
  }

  return (
    <Container bottom='small'>
      <StatusMessageNotification variant='yellow'>
        You must authorize your Toptal email account.{' '}
        <Link
          href={authUrl as string}
          data-testid='AuthorizeGmailNotification-link'
        >
          Sign in with Gmail.
        </Link>
      </StatusMessageNotification>
    </Container>
  )
}

export default AuthorizeGmailNotification
