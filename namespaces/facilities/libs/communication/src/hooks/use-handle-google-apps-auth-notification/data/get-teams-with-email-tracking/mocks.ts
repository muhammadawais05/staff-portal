import { GET_TEAMS_WITH_EMAIL_TRACKING } from './get-teams-with-email-tracking.staff.gql'

export const createGetTeamsWithEmailTrackingMock = (
  emailTracking: boolean,
  userId = 'VjEtU3RhZmYtMzM1Mzkz'
) => {
  const getTeamsWithEmailTrackingMock = {
    viewer: {
      me: {
        id: userId,
        teams: {
          nodes: emailTracking
            ? [
                {
                  id: 'test-id',
                  emailTracking: true,
                  __typename: 'Team'
                }
              ]
            : [],
          __typename: 'TeamConnection'
        },
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }

  return {
    request: { query: GET_TEAMS_WITH_EMAIL_TRACKING },
    result: { data: getTeamsWithEmailTrackingMock }
  }
}
