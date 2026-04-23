import { UPDATE_VIEWER_TIMEZONE } from './update-viewer-timezone.staff.gql'

export const createUpdateViewerTimezoneMock = (
  timeZoneName: string,
  newTimeZone?: { name: string; value: string }
) => ({
  request: {
    query: UPDATE_VIEWER_TIMEZONE,
    variables: { input: { timeZoneName } }
  },
  result: {
    data: {
      updateViewerTimeZone: {
        __typename: 'MutationResult',
        success: true,
        errors: [],
        viewer: {
          me: {
            id: '123',
            timeZone: {
              name: newTimeZone?.name,
              value: newTimeZone?.value,
              utcOffset: '3600',
              __typename: 'TimeZone'
            },
            __typename: 'Staff'
          },
          __typename: 'Viewer'
        }
      }
    }
  }
})

export const createUpdateViewerTimezoneFailedMock = (
  timeZoneName: string,
  errorMessage = 'Network error occurred.'
) => ({
  request: {
    query: UPDATE_VIEWER_TIMEZONE,
    variables: { input: { timeZoneName } }
  },
  error: new Error(errorMessage)
})
