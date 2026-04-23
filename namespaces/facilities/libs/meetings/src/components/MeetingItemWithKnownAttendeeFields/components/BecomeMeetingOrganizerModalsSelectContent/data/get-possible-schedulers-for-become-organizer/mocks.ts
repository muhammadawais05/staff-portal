import { GetPossibleSchedulersForBecomeOrganizerQueryVariables } from './get-possible-schedulers-for-become-organizer.staff.gql.types'

export const defaultPossibleScheduler = {
  id: 'VjEtTWVldGluZ1NjaGVkdWxlci0xMjA2MTU',
  code: 'DanMoredo1',
  role: {
    id: 'VjEtU3RhZmYtNzgzNjUw',
    fullName: 'Dan Moredo',
    availableForMeeting: false,
    __typename: 'Staff'
  },
  __typename: 'MeetingScheduler'
}

export const createGetPossibleSchedulersForBecomeOrganizerMock = (
  variables: GetPossibleSchedulersForBecomeOrganizerQueryVariables
) => ({
  request: {
    variables
  },
  result: {
    data: {
      node: {
        id: variables.meetingId,
        __typename: 'Meeting',
        possibleSchedulersForBecomeOrganizer: {
          __typename: 'MeetingSchedulerConnection',
          nodes: [defaultPossibleScheduler]
        }
      }
    }
  }
})

export const createGetPossibleSchedulersForBecomeOrganizer500ErrorMock = (
  variables: GetPossibleSchedulersForBecomeOrganizerQueryVariables
) => ({
  request: {
    variables
  },
  result: { data: { node: null } }
})

export const createGetPossibleSchedulersForBecomeOrganizerFailedMock = () => ({
  request: {
    variables: {
      meetingId: 'VjEtTWVldGluZy04MTIzNTE',
      from: '2020-11-09T14:40:00+08:00',
      till: '2020-11-09T06:50:00.000Z'
    }
  },
  error: new Error('Network error occurred')
})
