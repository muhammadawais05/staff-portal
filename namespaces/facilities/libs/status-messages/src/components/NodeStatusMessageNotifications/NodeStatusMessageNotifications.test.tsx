import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import StatusMessagesNotifications from '../StatusMessagesNotifications'
import NodeStatusMessageNotifications from './NodeStatusMessageNotifications'
import { useGetNodeStatusMessages } from './data/node-status-messages/get-node-status-messages.staff.gql'

const OFAC_UPDATED = 'OFAC_UPDATED'

jest.mock(
  './data/node-status-messages/get-node-status-messages.staff.gql',
  () => ({
    useGetNodeStatusMessages: jest.fn()
  })
)
jest.mock('../StatusMessagesNotifications', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))
jest.mock('@staff-portal/ofac-compliance', () => ({
  OFAC_UPDATED
}))

const renderComponent = (
  props: ComponentProps<typeof NodeStatusMessageNotifications>
) => render(<NodeStatusMessageNotifications {...props} />)

const MockStatusMessagesNotifications = StatusMessagesNotifications as jest.Mock
const mockUseGetNodeStatusMessages = useGetNodeStatusMessages as jest.Mock
const mockUseMessageListener = useMessageListener as jest.Mock

describe('StaffProfileStatusMessages', () => {
  beforeEach(() => {
    MockStatusMessagesNotifications.mockReturnValueOnce(null)
  })

  describe('when statusMessages provided', () => {
    it('renders statuses', () => {
      const statusMessages = Symbol() as unknown as []
      const id = Symbol() as unknown as string
      const OTHER_MESSAGES = {
        metaData: 'OTHER_MESSAGES'
      }

      mockUseGetNodeStatusMessages.mockReturnValueOnce({
        statusMessages,
        loading: false
      })

      renderComponent({ id, refetchOnMessages: [OTHER_MESSAGES] })

      expect(mockUseMessageListener).toHaveBeenCalledTimes(1)
      expect(mockUseMessageListener).toHaveBeenCalledWith(
        [OTHER_MESSAGES, OFAC_UPDATED],
        expect.any(Function)
      )
      expect(MockStatusMessagesNotifications).toHaveBeenCalledTimes(1)
      expect(MockStatusMessagesNotifications).toHaveBeenCalledWith(
        { statusMessages },
        {}
      )
      expect(mockUseGetNodeStatusMessages).toHaveBeenCalledTimes(1)
      expect(mockUseGetNodeStatusMessages).toHaveBeenCalledWith(id)
    })
  })

  describe('when either statusMessages empty or messages are loading', () => {
    it.each([
      { statusMessages: [], loading: true },
      { statusMessages: [{}], loading: true },
      { loading: false },
      { loading: true }
    ])('renders nothing', ({ statusMessages, loading }) => {
      const id = Symbol() as unknown as string

      mockUseGetNodeStatusMessages.mockReturnValueOnce({
        statusMessages,
        loading
      })

      renderComponent({ id })

      expect(MockStatusMessagesNotifications).toHaveBeenCalledTimes(0)
    })
  })
})
