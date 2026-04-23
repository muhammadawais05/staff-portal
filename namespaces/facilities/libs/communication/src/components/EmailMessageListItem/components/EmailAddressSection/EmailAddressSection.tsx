import React, { Fragment, useState } from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import EmailAddressActions from '../EmailAddressActions'
import EmailUser from '../EmailUser'
import { EmailContact } from '../../../../types'

const TO_DEFAULT_LENGTH = 5

const getEmailParticipant = (contacts: EmailContact[]) => {
  if (!contacts.length) {
    throw new Error('At least one contact should be provided')
  }

  const { name = '', email, path, blacklisted } = contacts[0]

  if (contacts.length === 1) {
    if (name) {
      return <EmailUser emailAddresses={[email]} userName={name} path={path} />
    }

    return (
      <EmailAddressActions emailAddress={email} blacklisted={blacklisted} />
    )
  }

  return (
    <EmailUser
      emailAddresses={contacts.map(({ email: contactEmail }) => contactEmail)}
      userName={name}
      path={path}
    />
  )
}

const aggregateContactsByUser = (contacts: EmailContact[]) => {
  const contactPeopleTo = new Map<string, EmailContact[]>()

  contacts.forEach(contact => {
    const contactId = contact.id || contact.email

    contactPeopleTo.set(contactId, [
      ...(contactPeopleTo.get(contactId) || []),
      contact
    ])
  })

  return Array.from(contactPeopleTo)
}

export interface Props {
  from: EmailContact
  to: EmailContact[]
}

const getContactsList = (contactList: [string, EmailContact[]][]) =>
  contactList.map(([recipientId, contacts], index) => (
    <Fragment key={recipientId}>
      {getEmailParticipant(contacts)}
      {index + 1 !== contactList.length ? ', ' : null}
    </Fragment>
  ))

const EmailAddressSection = ({ from, to }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const contactPeopleTo = aggregateContactsByUser(to)
  const contactPeopleToDefaultList = contactPeopleTo.slice(0, TO_DEFAULT_LENGTH)
  const contactPeopleToMoreList = contactPeopleTo.slice(TO_DEFAULT_LENGTH)

  return (
    <Typography size='medium' color='dark-grey' as='div' inline>
      {getEmailParticipant([from])} to{' '}
      {getContactsList(contactPeopleToDefaultList)}
      {showMore && (
        <>
          {', '}
          {getContactsList(contactPeopleToMoreList)}
        </>
      )}
      {contactPeopleToMoreList.length > 0 && (
        <>
          {', '}
          <Link onClick={() => setShowMore(!showMore)}>
            {showMore
              ? 'show less'
              : `and ${contactPeopleToMoreList.length} more`}
          </Link>
        </>
      )}
    </Typography>
  )
}

export default EmailAddressSection
