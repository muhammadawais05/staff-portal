import {
  ContactType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { GetJobContactsItemFragment } from '../../data/get-job-client-contacts.staff.gql.types'

export const contactData: GetJobContactsItemFragment = {
  node: {
    fullName: 'John Doe',
    id: '33',
    webResource: {
      url: 'google.com'
    },
    phoneNumber: '+799999999',
    email: 'john.doe@toptal.com',
    timeZone: {
      value: 'Europe/Moscow',
      name: 'Europe/Moscow'
    },
    contacts: {
      nodes: [
        {
          id: 'contact-id',
          value: '+799999999',
          primary: true,
          type: ContactType.PHONE
        }
      ]
    },
    photo: {
      small: '//photo-url'
    }
  },
  operations: {
    removeJobContact: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}
