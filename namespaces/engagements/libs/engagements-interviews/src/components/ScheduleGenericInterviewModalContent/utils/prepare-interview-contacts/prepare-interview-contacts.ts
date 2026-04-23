import { ExternalInterviewContact } from '@staff-portal/graphql/staff'

export const prepareInterviewContacts = (
  contacts: string[],
  primaryContactId?: string
): ExternalInterviewContact[] =>
  contacts.map(id => ({ id, main: id === primaryContactId }))
