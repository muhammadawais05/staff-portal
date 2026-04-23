import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'
import { getDifferenceInDaysFromNow } from '@staff-portal/date-time-utils'

import SubmittedField from './SubmittedField'

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getDifferenceInDaysFromNow: jest.fn(),
  getDateDistanceFromNow: (date: string) => `getDateDistanceFromNow-${date}`
}))

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateTimeFormatter: () => (value: string) =>
    `user-date-formatter-${value}`
}))

const arrangeTest = (props: ComponentProps<typeof SubmittedField>) =>
  render(
    <TestWrapper>
      <SubmittedField {...props} />
    </TestWrapper>
  )

describe('SubmittedField', () => {
  describe('when answeredAt is empty', () => {
    it('does not render anything', () => {
      arrangeTest({ answeredAt: null })

      expect(
        screen.queryByTestId('talent-interview-feedback-submitted')
      ).not.toBeInTheDocument()
    })
  })

  describe('when daysDiff equals 30', () => {
    it('renders just a text without tooltip', () => {
      const getDifferenceInDaysFromNowMock =
        getDifferenceInDaysFromNow as jest.Mock

      getDifferenceInDaysFromNowMock.mockReturnValue(30)
      arrangeTest({ answeredAt: '2016-09-13T23:11:34+08:00' })

      expect(
        screen.getByText('user-date-formatter-2016-09-13T23:11:34+08:00')
      ).toBeInTheDocument()
    })
  })

  describe('when daysDiff equals 35', () => {
    it('renders just a text without tooltip', () => {
      const getDifferenceInDaysFromNowMock =
        getDifferenceInDaysFromNow as jest.Mock

      getDifferenceInDaysFromNowMock.mockReturnValue(35)
      arrangeTest({ answeredAt: '2016-09-13T23:11:34+08:00' })

      expect(
        screen.getByText('user-date-formatter-2016-09-13T23:11:34+08:00')
      ).toBeInTheDocument()
    })
  })

  describe('when daysDiff equals 29', () => {
    it('renders a tooltip', () => {
      const getDifferenceInDaysFromNowMock =
        getDifferenceInDaysFromNow as jest.Mock

      getDifferenceInDaysFromNowMock.mockReturnValue(29)
      arrangeTest({ answeredAt: '2016-09-13T23:11:34+08:00' })

      expect(
        screen.getByText('getDateDistanceFromNow-2016-09-13T23:11:34+08:00')
      ).toBeInTheDocument()

      assertOnTooltipText(
        screen.getByTestId('talent-interview-feedback-submitted'),
        'user-date-formatter-2016-09-13T23:11:34+08:00'
      )
    })
  })

  describe('when daysDiff equals 0', () => {
    it('renders a tooltip', () => {
      const getDifferenceInDaysFromNowMock =
        getDifferenceInDaysFromNow as jest.Mock

      getDifferenceInDaysFromNowMock.mockReturnValue(0)
      arrangeTest({ answeredAt: '2016-09-13T23:11:34+08:00' })

      expect(
        screen.getByText('getDateDistanceFromNow-2016-09-13T23:11:34+08:00')
      ).toBeInTheDocument()

      assertOnTooltipText(
        screen.getByTestId('talent-interview-feedback-submitted'),
        'user-date-formatter-2016-09-13T23:11:34+08:00'
      )
    })
  })
})
