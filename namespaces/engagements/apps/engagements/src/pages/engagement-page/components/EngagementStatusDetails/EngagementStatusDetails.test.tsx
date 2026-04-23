import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import EngagementStatusDetails, { Props } from './EngagementStatusDetails'
import { getEngagementStatusDetails } from './utils'

jest.mock('./utils')
const mockGetEngagementStatusDetails = getEngagementStatusDetails as jest.Mock

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getDateDistanceFromNow: () => 'some value'
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EngagementStatusDetails {...({} as Props)} />
    </TestWrapper>
  )

describe('EngagementStatusDetails', () => {
  describe('when message is missing', () => {
    it('shows a dash', () => {
      mockGetEngagementStatusDetails.mockReturnValue({ message: undefined })

      arrangeTest()

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })

  describe('when comment is missing', () => {
    it('shows the message only', () => {
      mockGetEngagementStatusDetails.mockReturnValue({
        message: 'Hello World',
        occurredAt: '2021-05-25T06:00:00+03:00'
      })

      arrangeTest()

      expect(
        screen.getByTestId('EngagementStatusDetails-message')
      ).toBeInTheDocument()

      expect(
        screen.queryByTestId('EngagementStatusDetails-comment')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementStatusDetails-date')
      ).not.toBeInTheDocument()
    })
  })

  describe('when occurredAt is missing', () => {
    it('shows the message only', () => {
      mockGetEngagementStatusDetails.mockReturnValue({
        message: 'Hello World',
        comment: 'Some Comment'
      })

      arrangeTest()

      expect(
        screen.getByTestId('EngagementStatusDetails-message')
      ).toBeInTheDocument()

      expect(
        screen.queryByTestId('EngagementStatusDetails-comment')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementStatusDetails-date')
      ).not.toBeInTheDocument()
    })
  })

  describe('when comment and occurredAt is missing', () => {
    it('shows the message only', () => {
      mockGetEngagementStatusDetails.mockReturnValue({
        message: 'Hello World'
      })

      arrangeTest()

      expect(
        screen.getByTestId('EngagementStatusDetails-message')
      ).toBeInTheDocument()

      expect(
        screen.queryByTestId('EngagementStatusDetails-comment')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementStatusDetails-date')
      ).not.toBeInTheDocument()
    })
  })

  describe('when message, comment and occurredAt are provided', () => {
    it('shows all fields', () => {
      mockGetEngagementStatusDetails.mockReturnValue({
        message: 'Hello World',
        comment: 'Some comment',
        occurredAt: '2021-05-25T06:00:00+03:00'
      })

      arrangeTest()

      expect(
        screen.getByTestId('EngagementStatusDetails-message')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('EngagementStatusDetails-comment')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('EngagementStatusDetails-date')
      ).toBeInTheDocument()
    })
  })
})
