import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import RelatedToTimeTooltip, { Props } from './RelatedToTimeTooltip'
import { getTimeZoneData } from './utils'

jest.mock('./utils', () => ({
  __esModule: true,
  getTimeZoneData: jest.fn()
}))

const arrangeTest = ({ engagedSubjects = [] }: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <RelatedToTimeTooltip engagedSubjects={engagedSubjects} />
    </TestWrapper>
  )

describe('RelatedToTimeTooltip', () => {
  describe('when engaged subjects list is empty', () => {
    it('returns an empty fragment', () => {
      arrangeTest()

      expect(
        screen.queryByTestId('RelatedToTimeTooltip-item')
      ).not.toBeInTheDocument()
    })
  })

  describe('when engaged subjects is not empty', () => {
    it('shows the related to time tooltip items', () => {
      const FULL_NAME = 'Test Name'
      const TYPE = 'Contact'
      const TIME_ZONE = '(UTC-11:00) Pacific - Samoa'
      const mockGetTimeZoneData = getTimeZoneData as jest.Mock

      mockGetTimeZoneData.mockReturnValue({
        name: FULL_NAME,
        type: TYPE,
        timeZoneName: TIME_ZONE
      })

      arrangeTest({ engagedSubjects: [{ id: '1', fullName: FULL_NAME }] })

      expect(screen.getByText(FULL_NAME)).toBeInTheDocument()
      expect(screen.getByText(TYPE)).toBeInTheDocument()
      expect(screen.getByText(TIME_ZONE)).toBeInTheDocument()
    })
  })
})
