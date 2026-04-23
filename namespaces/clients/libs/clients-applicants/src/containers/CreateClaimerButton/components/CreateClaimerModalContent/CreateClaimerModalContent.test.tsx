import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CreateClaimerModalContent from './CreateClaimerModalContent'
import { getQuestionText } from '../../services'
import ContentWithoutPendingCallbackRequest from '../ContentWithoutPendingCallbackRequest/ContentWithoutPendingCallbackRequest'
import ContentWithPendingCallbackRequest from '../ContentWithPendingCallbackRequest/ContentWithPendingCallbackRequest'

jest.mock(
  '../ContentWithoutPendingCallbackRequest/ContentWithoutPendingCallbackRequest',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)
jest.mock(
  '../ContentWithPendingCallbackRequest/ContentWithPendingCallbackRequest',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)
jest.mock('../../services', () => ({
  getCallRequestText: jest.fn(),
  getQuestionText: jest.fn()
}))

const renderComponent = (
  props: ComponentProps<typeof CreateClaimerModalContent>
) =>
  render(
    <TestWrapper>
      <CreateClaimerModalContent {...props} />
    </TestWrapper>
  )

const mockedContentWithoutPendingCallbackRequest =
  ContentWithoutPendingCallbackRequest as jest.Mock
const mockedContentWithPendingCallbackRequest =
  ContentWithPendingCallbackRequest as jest.Mock
const mockedGetQuestionText = getQuestionText as jest.Mock

describe('CreateClaimerModalContent', () => {
  const question = {}

  beforeEach(() => {
    mockedContentWithoutPendingCallbackRequest.mockReturnValueOnce(null)
    mockedContentWithPendingCallbackRequest.mockReturnValueOnce(null)
    mockedGetQuestionText.mockReturnValueOnce(question)
  })

  describe('when pendingCallbackRequest is not passed', () => {
    it('renders ContentWithoutPendingCallbackRequest', () => {
      const obscureLead = true
      const fullName = 'fullName'
      const company = {
        id: 'id',
        fullName,
        obscureLead
      }

      renderComponent({
        company
      })

      expect(mockedGetQuestionText).toHaveBeenCalledTimes(1)
      expect(mockedGetQuestionText).toHaveBeenCalledWith({
        obscureLead,
        fullName
      })
      expect(mockedContentWithoutPendingCallbackRequest).toHaveBeenCalledTimes(
        1
      )
      expect(mockedContentWithoutPendingCallbackRequest).toHaveBeenCalledWith(
        {
          question
        },
        {}
      )
      expect(mockedContentWithPendingCallbackRequest).toHaveBeenCalledTimes(0)
    })
  })

  describe('when pendingCallbackRequest is passed', () => {
    it('renders ContentWithPendingCallbackRequest', () => {
      const obscureLead = true
      const fullName = 'fullName'
      const pendingCallbackRequest = {
        id: 'id'
      }
      const company = {
        id: 'id',
        fullName,
        obscureLead,
        pendingCallbackRequest
      }
      const timeZoneName = 'timeZoneName'

      renderComponent({
        company,
        timeZoneName
      })

      expect(mockedGetQuestionText).toHaveBeenCalledTimes(1)
      expect(mockedGetQuestionText).toHaveBeenCalledWith({
        obscureLead,
        fullName
      })
      expect(mockedContentWithPendingCallbackRequest).toHaveBeenCalledTimes(1)
      expect(mockedContentWithPendingCallbackRequest).toHaveBeenCalledWith(
        {
          question,
          pendingCallbackRequest,
          timeZoneName
        },
        {}
      )
      expect(mockedContentWithoutPendingCallbackRequest).toHaveBeenCalledTimes(
        0
      )
    })
  })
})
