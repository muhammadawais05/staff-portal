import { gql } from '@staff-portal/data-layer-service'

export const PHONE_CONTACTS_FRAGMENT = gql`
  fragment PhoneContactsFragment on Role {
    phoneContacts: contacts(filter: { type: [PHONE] }) {
      ...ContactNodesFragment
    }
  }

  fragment ContactNodesFragment on ContactConnection {
    nodes {
      id
      value
      primary
    }
  }
`
