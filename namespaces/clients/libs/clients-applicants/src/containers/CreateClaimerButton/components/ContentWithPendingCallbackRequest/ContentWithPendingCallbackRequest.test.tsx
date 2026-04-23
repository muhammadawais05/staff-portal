import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import {
  OverlappingMeetingsText,
  OutsideWorkingHoursText,
  ClaimCallRequestModalIcon
} from '@staff-portal/clients-call-requests'

import ContentWithPendingCallbackRequest from './ContentWithPendingCallbackRequest'
import { GetCreateClaimerDetailsQuery } from '../../data'

const getCallRequestTextMock = 'getCallRequestText'

jest.mock('@staff-portal/current-user', () => ({
  useUserDateTimeFormatter: jest.fn()
}))
jest.mock('../../services', () => ({
  ...jest.requireActual('../../services'),
  getCallRequestText: () => getCallRequestTextMock
}))
jest.mock('@staff-portal/clients-call-requests', () => ({
  OverlappingMeetingsText: jest.fn(),
  OutsideWorkingHoursText: jest.fn(),
  ClaimCallRequestModalIcon: jest.fn()
}))

const renderComponent = (
  props: ComponentProps<typeof ContentWithPendingCallbackRequest>
) =>
  render(
    <TestWrapper>
      <ContentWithPendingCallbackRequest {...props} />
    </TestWrapper>
  )

const mockedOverlappingMeetingsText = OverlappingMeetingsText as jest.Mock
const mockedOutsideWorkingHoursText = OutsideWorkingHoursText as jest.Mock
const mockedClaimCallRequestModalIcon = ClaimCallRequestModalIcon as jest.Mock
const mockedUseUserDateTimeFormatter = useUserDateTimeFormatter as jest.Mock

describe('ContentWithPendingCallbackRequest', () => {
  const formatDateTimeValue = 'formatDateTime'
  const formatDateTime = () => formatDateTimeValue
  const question = 'question'
  const type = 'type'
  const requestedStartTime = '2022-01-01T00:00:00+00:00'
  const timeZoneName = 'timeZoneName'
  const overlappingMeetings: NonNullable<
    NonNullable<GetCreateClaimerDetailsQuery['node']>['pendingCallbackRequest']
  >['overlappingMeetings'] = {
    nodes: [
      {
        name: 'name',
        scheduledAt: '2022-01-01T00:00:00+00:00'
      }
    ]
  }
  const inWorkingHours = true

  beforeEach(() => {
    mockedOverlappingMeetingsText.mockReturnValueOnce(null)
    mockedOutsideWorkingHoursText.mockReturnValueOnce(null)
    mockedClaimCallRequestModalIcon.mockReturnValueOnce(null)
    mockedUseUserDateTimeFormatter.mockReturnValueOnce(formatDateTime)
  })

  describe('when all the data provided without conditions', () => {
    it('default render', () => {
      renderComponent({
        question,
        pendingCallbackRequest: {
          id: '',
          type,
          requestedStartTime,
          overlappingMeetings,
          inWorkingHours
        },
        timeZoneName
      })

      expect(
        screen.getByTestId('content-with-pending-callback-request-question')
          .textContent
      ).toBe(question + getCallRequestTextMock)
      expect(
        screen.getByTestId('content-with-pending-callback-request-message')
          .textContent
      ).toBe('You will be responsible for their application.')
      expect(mockedOverlappingMeetingsText).toHaveBeenCalledTimes(1)
      expect(mockedOverlappingMeetingsText).toHaveBeenCalledWith(
        {
          type,
          meetings: overlappingMeetings.nodes
        },
        {}
      )
      expect(mockedOutsideWorkingHoursText).toHaveBeenCalledTimes(1)
      expect(mockedOutsideWorkingHoursText).toHaveBeenCalledWith(
        {
          type,
          inWorkingHours: Boolean(inWorkingHours)
        },
        {}
      )
      expect(mockedClaimCallRequestModalIcon).toHaveBeenCalledTimes(1)
      expect(mockedClaimCallRequestModalIcon).toHaveBeenCalledWith(
        {
          type
        },
        {}
      )
    })
  })

  describe('when overlappingMeetings nodes not data provided', () => {
    it('default render', () => {
      renderComponent({
        question,
        pendingCallbackRequest: {
          id: '',
          type,
          requestedStartTime,
          overlappingMeetings: undefined,
          inWorkingHours
        },
        timeZoneName
      })

      expect(mockedOverlappingMeetingsText).toHaveBeenCalledTimes(1)
      expect(mockedOverlappingMeetingsText).toHaveBeenCalledWith(
        {
          type,
          meetings: []
        },
        {}
      )
    })
  })
})
