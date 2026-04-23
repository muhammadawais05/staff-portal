import { ContactType } from '@staff-portal/graphql/staff'

import { PHONE_TYPES } from '../../../../constants'
import { CallableClientContactFragment } from '../../../../data/callable-client-fragment/callable-client-fragment.staff.gql.types'

const getDefaultContact = (contacts: CallableClientContactFragment[]) => {
  const phoneContacts = contacts.filter(({ type }) =>
    PHONE_TYPES.includes(type)
  )
  const primaryPhoneContact = phoneContacts.find(({ primary }) => primary)

  if (primaryPhoneContact) {
    return primaryPhoneContact
  }

  if (!primaryPhoneContact && phoneContacts.length > 0) {
    return phoneContacts[0]
  }

  const skypeContact = contacts.find(({ type }) => type === ContactType.SKYPE)

  if (!skypeContact) {
    throw new Error(`Unable to get client's phone number or Skype`)
  }

  return skypeContact
}

export default getDefaultContact
