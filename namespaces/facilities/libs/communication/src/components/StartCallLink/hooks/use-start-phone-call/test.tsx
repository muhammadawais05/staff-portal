import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useNotifications } from '@toptal/picasso/utils'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import useStartPhoneCall from './use-start-phone-call'
import {
  createStartCallMock,
  createStartCallInvalidMock
} from '../../data/start-call/mocks'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

const phoneNumberSample = '12345'
const showSuccess = jest.fn()
const showError = jest.fn()

const TestComponent = ({ phoneNumber }: { phoneNumber: string }) => {
  const { startPhoneCall } = useStartPhoneCall()

  const startCall = async () => await startPhoneCall(phoneNumber)

  return <span onClick={startCall}>Click Me</span>
}

const arrangeTest = (
  mockedResponse: MockedResponse,
  phoneNumber: string = phoneNumberSample
) => {
  render(
    <TestWrapperWithMocks mocks={[mockedResponse]}>
      <TestComponent phoneNumber={phoneNumber} />
    </TestWrapperWithMocks>
  )
}

describe('useStartPhoneCall', () => {
  beforeEach(() => {
    const useNotificationsMock = useNotifications as jest.Mock

    useNotificationsMock.mockReturnValue({ showSuccess, showError })
  })

  describe('when call success', () => {
    it('shows a success notification', async () => {
      arrangeTest(
        createStartCallMock({ input: { phoneNumber: phoneNumberSample } })
      )

      fireEvent.click(screen.getByText('Click Me'))

      await waitFor(() => {
        expect(showSuccess).toHaveBeenCalled()
      })
    })
  })

  describe('when call fails', () => {
    it('shows an error notification', async () => {
      arrangeTest(
        createStartCallInvalidMock({
          input: { phoneNumber: phoneNumberSample }
        })
      )

      fireEvent.click(screen.getByText('Click Me'))

      await waitFor(() => {
        expect(showError).toHaveBeenCalled()
      })
    })

    it('shows notice as notification if it has one', async () => {
      arrangeTest(
        createStartCallInvalidMock({
          input: { phoneNumber: phoneNumberSample },
          noticeMessage: 'Notice Error'
        })
      )

      fireEvent.click(screen.getByText('Click Me'))

      await waitFor(() => {
        expect(showError).toHaveBeenCalledWith('Notice Error')
      })
    })
  })
})
