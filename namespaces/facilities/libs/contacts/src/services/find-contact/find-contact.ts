import { ContactType } from '@staff-portal/graphql/staff'

export const findContact = <T extends { type: ContactType }>(
  { nodes }: { nodes: T[] },
  contactType: ContactType
) => nodes.find(contact => contact.type === contactType)
