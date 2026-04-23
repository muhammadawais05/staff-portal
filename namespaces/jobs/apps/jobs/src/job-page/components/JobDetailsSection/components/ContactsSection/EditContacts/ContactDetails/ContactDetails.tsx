import React, { useCallback } from 'react'
import {
  Avatar,
  Button,
  Container,
  Typography,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getTimeZoneFullText } from '@staff-portal/date-time-utils'
import { ContactType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { PhoneLink } from '@staff-portal/communication'
import { NO_VALUE } from '@staff-portal/config'

import useRemoveContact from '../hooks/use-remove-contact'
import { GetJobContactsItemFragment } from '../../data/get-job-client-contacts.staff.gql.types'

interface Props {
  contact: GetJobContactsItemFragment
  jobId: string
}

const ContactDetails = ({ contact, jobId }: Props) => {
  const {
    node: {
      id: contactId,
      photo,
      phoneNumber,
      fullName,
      email,
      timeZone,
      webResource,
      contacts
    },
    operations: { removeJobContact: removeJobContactOperation }
  } = contact
  const { removeLoading, handleContactRemove } = useRemoveContact({ jobId })

  const handleRemoveClick = useCallback(() => {
    handleContactRemove(contactId)
  }, [handleContactRemove, contactId])

  const primaryContact = contacts?.nodes.find(
    contact => contact.primary && contact.type === ContactType.PHONE
  )

  return (
    <Container>
      <Container flex>
        <Container right='medium'>
          <Avatar
            name={fullName}
            src={photo?.small as string}
            size='small'
            data-testid='ContactDetails-avatar'
          />
        </Container>
        <Container>
          <Container data-testid='contact-details-phone-number'>
            <Typography size='medium'>{fullName || NO_VALUE}</Typography>
            {phoneNumber && primaryContact ? (
              <PhoneLink
                roleId={contactId}
                phoneContactId={primaryContact.id}
                renderPhoneContact={() => (
                  <Typography size='medium' color='inherit'>
                    {phoneNumber}
                  </Typography>
                )}
              />
            ) : (
              <Typography size='medium' color='inherit'>
                {NO_VALUE}
              </Typography>
            )}
          </Container>
          <Link href={`mailto:${email}`}>
            <Typography color='inherit' size='medium'>
              {email || NO_VALUE}
            </Typography>
          </Link>
          <Typography size='medium'>{getTimeZoneFullText(timeZone)}</Typography>
        </Container>
      </Container>
      <Container flex justifyContent='space-between' top='medium'>
        {webResource.url && (
          <Button
            as={Link as typeof PicassoLink}
            href={webResource.url as string}
            noUnderline
            size='small'
            variant='secondary'
            data-testid='ContactDetails-profile-link'
          >
            View Profile
          </Button>
        )}
        <Operation
          operation={removeJobContactOperation}
          render={disabled => (
            <Button
              variant='negative'
              size='small'
              disabled={disabled}
              loading={removeLoading}
              onClick={handleRemoveClick}
              data-testid='ContactDetails-remove-btn'
            >
              Remove Contact
            </Button>
          )}
        />
      </Container>
    </Container>
  )
}

export default ContactDetails
