import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ContactType, Contact } from '@staff-portal/graphql/staff'

import { contactMock } from '~integration/mocks/contact-mock'

type Props = {
  companyContacts?: Partial<Contact[]>
}

export const getClientContactResponse = ({ companyContacts }: Props = {}) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      contact: {
        id: encodeEntityId('123', 'CompanyRepresentative'),
        contacts: {
          nodes: companyContacts || [contactMock({ type: ContactType.EMAIL })],
          __typename: 'ContactConnection'
        },
        __typename: 'CompanyRepresentative'
      },
      __typename: 'Client'
    }
  }
})
