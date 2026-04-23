import { BecomeMeetingOrganizerMutationVariables } from './become-meeting-organizer.staff.gql.types'

export const createBecomeMeetingOrganizerMock = (
  success: boolean,
  variables: BecomeMeetingOrganizerMutationVariables
) => ({
  request: {
    variables
  },
  result: {
    data: {
      becomeMeetingOrganizer: {
        success,
        errors: [],
        meeting: null,
        __typename: 'BecomeMeetingOrganizerPayload'
      },
      __typename: 'Mutation'
    }
  }
})
