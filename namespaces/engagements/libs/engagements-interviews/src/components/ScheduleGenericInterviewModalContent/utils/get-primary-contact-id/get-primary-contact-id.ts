import { ScheduleInterviewInterviewContactsFragment } from '../../../../data/fragments/schedule-interview-fragment'

export const getPrimaryContactId = (
  contacts: string[],
  interviewContacts: ScheduleInterviewInterviewContactsFragment
) => {
  let primaryContactId = interviewContacts.edges.find(item => !!item.main)?.node
    .id

  if (!primaryContactId && contacts.length > 0) {
    primaryContactId = contacts[0]
  }

  return primaryContactId
}
