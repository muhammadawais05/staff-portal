import { encodeEntityId } from '@staff-portal/data-layer-service'

import { GET_CURRENT_USER } from './use-get-current-user.staff.gql'

type Props = {
  userFullName?: string
  userId?: string
  userEmail?: string
  timeZone?: string
}

export const createCurrentUserMock = ({
  userFullName = 'John Doe',
  userId = '123',
  userEmail = 'john.doe@toptal.com',
  timeZone = 'Europe/London'
}: Props = {}) => ({
  id: encodeEntityId(userId, 'Staff'),
  email: userEmail,
  fullName: userFullName,
  type: 'Staff',
  timeZone: {
    value: timeZone,
    name: '(UTC+01:00) Europe - London',
    __typename: 'TimeZone'
  },
  __typename: 'Staff'
})

export const createGetCurrentUserMock = ({
  userFullName,
  userId,
  userEmail,
  timeZone
}: Props = {}) => ({
  request: { query: GET_CURRENT_USER },
  result: {
    data: {
      viewer: {
        me: {
          ...createCurrentUserMock({
            userFullName,
            userId,
            userEmail,
            timeZone
          })
        },
        __typename: 'Viewer'
      }
    }
  }
})

export const createGetCurrentUserFailedMock = (
  errorMessage = 'fake error message.'
) => ({
  request: { query: GET_CURRENT_USER },
  error: new Error(errorMessage)
})
