import { Contact } from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { GET_EMAIL_CONTACTS } from './get-email-contacts.staff.gql'

export const createGetEmailContactsMock = (
  contacts: Partial<Contact>[] = [],
  userId = 'VjEtU3RhZmYtMzM1Mzkz'
) => {
  const getEmailContactsMock = {
    viewer: {
      me: {
        id: userId,
        contacts: {
          nodes: mapToTypename(contacts, 'Contact'),
          __typename: 'ContactConnection'
        },
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }

  return {
    request: { query: GET_EMAIL_CONTACTS },
    result: { data: getEmailContactsMock }
  }
}

export const createGetEmailContactsEmptyMock = () => {
  const getEmailContactsMock = {
    viewer: {
      me: {
        id: 'VjEtU3RhZmYtMzM1Mzkz',
        contacts: [],
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }

  return {
    request: { query: GET_EMAIL_CONTACTS },
    result: { data: getEmailContactsMock }
  }
}
