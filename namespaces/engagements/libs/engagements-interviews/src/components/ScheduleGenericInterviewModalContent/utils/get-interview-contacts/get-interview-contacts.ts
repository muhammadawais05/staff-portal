import {
  ScheduleInterviewAvailableContactsFragment,
  ScheduleInterviewInterviewContactsFragment
} from '../../../../data/fragments/schedule-interview-fragment'

export const getInterviewContacts = (
  interviewContacts: ScheduleInterviewInterviewContactsFragment,
  availableContacts?: ScheduleInterviewAvailableContactsFragment | null
) => {
  if (interviewContacts.edges.length) {
    return interviewContacts.edges.map(({ node }) => node.id)
  }

  if (availableContacts?.nodes.length) {
    return [availableContacts.nodes[0].id]
  }

  return []
}
