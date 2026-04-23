import { Maybe } from '@toptal/picasso/utils'
import { ContactType } from '@staff-portal/graphql/staff'

import { ContactForTopCallFragment } from '../../data/contact-for-top-call-fragment/contact-for-top-call-fragment.staff.gql.types'

export const getPhoneNumbersForTopCall = (
  contacts?: Maybe<ContactForTopCallFragment[]>
) =>
  Array.from(
    new Set(
      contacts
        ?.filter(contact => contact.type === ContactType.PHONE)
        ?.map(contact => contact.value)
    )
  )
