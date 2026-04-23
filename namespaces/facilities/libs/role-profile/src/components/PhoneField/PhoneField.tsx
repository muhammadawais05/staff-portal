import { Typography } from '@toptal/picasso'
import { PhoneLink } from '@staff-portal/communication'
import React from 'react'

import { PhoneContactsFragment } from '../../data/phone-contacts-fragment'

export type Props = {
  roleId: string
  phoneContacts: PhoneContactsFragment['phoneContacts']
}

const PhoneField = ({ roleId, phoneContacts }: Props) => {
  const primaryPhoneContact = phoneContacts.nodes.find(
    contact => contact.primary
  )

  if (!primaryPhoneContact) {
    return null
  }

  return (
    <PhoneLink
      roleId={roleId}
      phoneContactId={primaryPhoneContact.id}
      renderPhoneContact={() => (
        <Typography size='medium' color='inherit'>
          {primaryPhoneContact.value}
        </Typography>
      )}
    />
  )
}

export default PhoneField
