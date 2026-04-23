import { ContactType } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { CallableClientContactFragment } from './callable-client-fragment.staff.gql.types'

export const createCallableClientFragmentMock = ({
  clientName = 'Test Client Name',
  roleId = encodeEntityId('100', 'Test'),
  contacts = [{}]
}: {
  clientName?: string
  roleId?: string
  contacts?: Partial<CallableClientContactFragment>[]
}) => ({
  id: encodeEntityId('1000', 'Test'),
  fullName: clientName,
  contact: {
    id: roleId,
    fullName: 'Test Contact Name',
    contacts: {
      nodes: contacts.map(contact => ({
        external: false,
        category: null,
        id: encodeEntityId('10', 'Test'),
        note: null,
        primary: false,
        type: ContactType.PHONE,
        value: '+12345678901',
        ...contact
      }))
    }
  }
})
