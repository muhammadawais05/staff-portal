import { useNavigate } from '@staff-portal/navigation'
import { useMutation } from '@staff-portal/data-layer-service'
import { renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'

import { useCreateConversationForStaff } from './use-create-conversation-for-staff'

jest.mock('@toptal/picasso/utils', () => ({
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  useNavigate: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  useMutation: jest.fn()
}))

const useNotificationsMock = useNotifications as jest.Mock
const useNavigateMock = useNavigate as jest.Mock
const useMutationMock = useMutation as jest.Mock
const showError = jest.fn()

describe('#useCreateConversationForStaff', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError })
  })

  describe('when slackChannelUrl is available', () => {
    it('calls navigate', async () => {
      const slackChannelUrl = 'https://slack.com/channel'
      const navigate = jest.fn()
      const mutate = jest.fn()

      useNavigateMock.mockReturnValue(navigate)
      useMutationMock.mockReturnValue([mutate])
      mutate.mockReturnValue({
        data: {
          createConversationForStaff: {
            topChatConversation: {
              slackChannelUrl
            }
          }
        }
      })

      const {
        result: { current }
      } = renderHook(() =>
        useCreateConversationForStaff({ representativeId: 'someId' })
      )

      await current()

      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith(slackChannelUrl)
    })
  })

  describe('when there is an error', () => {
    it('shows error message', async () => {
      const navigate = jest.fn()
      const mutate = jest.fn()

      useNavigateMock.mockReturnValue(navigate)
      useMutationMock.mockReturnValue([mutate])
      mutate.mockReturnValue({
        data: {
          createConversationForStaff: {
            success: false
          }
        }
      })

      const {
        result: { current }
      } = renderHook(() =>
        useCreateConversationForStaff({ representativeId: 'someId' })
      )

      await current()

      expect(showError).toHaveBeenCalledTimes(1)
      expect(showError).toHaveBeenCalledWith(
        'Error while opening TopChat Conversation'
      )
    })
  })
})
