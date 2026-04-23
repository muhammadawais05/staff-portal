import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useParams, Redirect } from '@staff-portal/navigation'
import { getNotFoundPath } from '@staff-portal/routes'
import { EmailMessageListItem } from '@staff-portal/communication'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { useGetEmailMessageWithUsers } from './utils'
import EmailMessageContentWrapper from '../../components/EmailMessageContentWrapper'

export interface Props {}

const getPageLoader = (addButton: boolean) => (
  <div data-testid='email-message-page-loader'>
    <ContentWrapper
      title='Email Message'
      actions={addButton && <SkeletonLoader.Button />}
    >
      <Section
        variant='withHeaderBar'
        title={<SkeletonLoader.Typography />}
        actions={<SkeletonLoader.Typography />}
      >
        <SkeletonLoader.Typography rows={4} />
      </Section>
    </ContentWrapper>
  </div>
)

const EmailMessage = () => {
  const params = useParams()
  const { id, entityType, entityId } = params as {
    id: string
    entityType: string
    entityId: string
  }
  const { showError } = useNotifications()

  const { emailMessageWithUser, loading, emailMessageError } =
    useGetEmailMessageWithUsers(id, {
      onGetUsersByEmailsError: () =>
        showError('Unable to fetch users by email.')
    })

  if (emailMessageError) {
    throw emailMessageError
  }

  if (loading) {
    const sendEmailButtonIsShown = Boolean(entityType)

    return getPageLoader(sendEmailButtonIsShown)
  }

  if (!emailMessageWithUser) {
    return <Redirect to={getNotFoundPath()} />
  }

  return (
    <EmailMessageContentWrapper entityType={entityType} entityId={entityId}>
      <EmailMessageListItem
        title={emailMessageWithUser.subject}
        emailMessageWithUsers={emailMessageWithUser}
      />
    </EmailMessageContentWrapper>
  )
}

export default EmailMessage
