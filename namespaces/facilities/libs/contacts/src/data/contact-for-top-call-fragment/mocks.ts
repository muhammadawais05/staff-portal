import { ContactType } from '@staff-portal/graphql/staff'

import { ContactForTopCallFragment } from './contact-for-top-call-fragment.staff.gql.types'

export const createContactForTopCallFragmentMock = (
  contact?: Partial<ContactForTopCallFragment>
): ContactForTopCallFragment => ({
  id: contact?.id || 'contact-id',
  value: contact?.value || 'contact-value',
  type: contact?.type || ContactType.PHONE
})
