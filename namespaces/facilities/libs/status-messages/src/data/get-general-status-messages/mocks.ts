import { GET_STATUS_MESSAGES } from './get-status-messages.staff.gql'
import {
  GetStatusMessagesQuery,
  GetStatusMessagesQueryVariables
} from './get-status-messages.staff.gql.types'
import { StatusMessageFragment } from '../status-message-fragment'
import { createStatusMessageFragmentMock } from '../status-message-fragment/mocks'
import { getCurrentTimezoneSettings } from '../../utils'

const { timezoneName, timezoneOffset } = getCurrentTimezoneSettings()

export const createGetStatusMessagesMock = (
  partialStatusMessages: Partial<StatusMessageFragment>[] = [],
  variables: GetStatusMessagesQueryVariables = {
    timezoneName,
    timezoneOffset
  }
) => {
  const statusMessages = partialStatusMessages.map(partialStatusMessage =>
    createStatusMessageFragmentMock(partialStatusMessage)
  )
  const getStatusMessageMock: GetStatusMessagesQuery & {
    viewer: { statusMessages: { __typename: string }; __typename: string }
  } = {
    viewer: {
      me: {
        // TODO: should receive the value from outside
        id: '123',
        __typename: 'Staff'
      },
      statusMessages: {
        nodes: statusMessages,
        __typename: 'StatusMessageConnection'
      },
      __typename: 'Viewer'
    }
  }

  return {
    request: { query: GET_STATUS_MESSAGES, variables },
    result: { data: getStatusMessageMock }
  }
}

export const createGetStatusMessagesFailedMock = (
  errors: [Error] = [new Error('Default test error message')],
  variables: GetStatusMessagesQueryVariables = { timezoneName, timezoneOffset }
) => ({
  request: { query: GET_STATUS_MESSAGES, variables },
  errors
})
