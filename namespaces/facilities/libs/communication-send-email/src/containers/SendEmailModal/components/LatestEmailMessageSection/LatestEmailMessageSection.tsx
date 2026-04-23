import React, { useState } from 'react'
import { Container, Typography, SkeletonLoader } from '@toptal/picasso'
import { useField } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { ListItemContainer } from '@staff-portal/ui'

import { RoleRecipientFragment } from '../../data/fragments'
import { EmailContext } from '../../types'
import { useSendEmailContext } from '../../context/send-email-context'
import LatestEmailMessage from '../LatestEmailMessage'
import { useGetLatestEmailMessageWithUsers } from './hooks/use-get-latest-email-message-with-users'

const useRoleRecipient = (
  emailContext: EmailContext
): RoleRecipientFragment => {
  const {
    input: { value: to }
  } = useField('to')

  const roleRecipient = emailContext.optionsSendTo?.nodes.find(
    ({ id }) => id === to
  )

  if (!roleRecipient) {
    throw new Error('Cannot find "Send To" option')
  }

  return roleRecipient
}

const LatestEmailMessageSection = () => {
  const { showError } = useNotifications()

  const { emailContext } = useSendEmailContext()
  const roleRecipient = useRoleRecipient(emailContext)
  const roleRecipientEmailAddresses = roleRecipient.contacts.nodes.map(
    node => node.value
  )

  const { emailMessageWithUsers, loading } = useGetLatestEmailMessageWithUsers(
    roleRecipientEmailAddresses,
    {
      onError: () => showError('Unable to fetch latest email message.')
    }
  )

  const [displayLatestEmail, setDisplayLatestEmail] = useState(false)

  if (loading) {
    return (
      <Container top='small'>
        <SkeletonLoader.Typography rows={1} />
        {displayLatestEmail && (
          <Container top='small'>
            <ListItemContainer>
              <SkeletonLoader.Typography rows={4} />
            </ListItemContainer>
          </Container>
        )}
      </Container>
    )
  }

  if (!emailMessageWithUsers) {
    return null
  }

  const roleRecipientName = roleRecipient.fullName
  const showLatestEmailMessageLinkText = displayLatestEmail
    ? `Hide Latest Email with ${roleRecipientName}`
    : `Show Latest Email with ${roleRecipientName}`
  const toggleShowLatestEmail = () => setDisplayLatestEmail(!displayLatestEmail)

  return (
    <Container top='small'>
      <Typography size='medium'>
        <Link onClick={toggleShowLatestEmail}>
          {showLatestEmailMessageLinkText}
        </Link>
      </Typography>
      {displayLatestEmail && (
        <LatestEmailMessage
          emailMessageWithUsers={emailMessageWithUsers}
          roleRecipient={roleRecipient}
        />
      )}
    </Container>
  )
}

export default LatestEmailMessageSection
