import { CreateMeetingMutationVariables } from './create-meeting.staff.gql.types'
import { CREATE_MEETING } from './create-meeting.staff.gql'

export const createCreateMeetingMock = ({
  input
}: {
  input: CreateMeetingMutationVariables['input']
}) => ({
  request: { query: CREATE_MEETING, variables: { input } },
  result: {
    data: {
      createMeeting: {
        success: true,
        errors: [],
        __typename: 'MutationResult'
      }
    }
  }
})

export const createCreateMeetingFailedMock = ({
  input
}: {
  input: CreateMeetingMutationVariables['input']
}) => ({
  request: { query: CREATE_MEETING, variables: { input } },
  error: new Error('Network error occurred')
})
