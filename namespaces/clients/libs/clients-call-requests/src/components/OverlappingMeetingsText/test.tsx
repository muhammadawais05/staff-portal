import React from 'react'
import { render, screen } from '@testing-library/react'
import { CallbackRequestOverlappingMeeting } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { CallRequestType } from '../../enums'
import OverlappingMeetingsText from './OverlappingMeetingsText'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: jest.fn()
}))

const arrangeTest = ({
  meetings,
  type
}: {
  meetings: CallbackRequestOverlappingMeeting[]
  type: CallRequestType
}) => {
  const formatDate = jest.fn()
  const useUserDateFormatterMocked = useUserDateFormatter as jest.Mock

  useUserDateFormatterMocked.mockReturnValue(formatDate)

  render(
    <TestWrapper>
      <OverlappingMeetingsText type={type} meetings={meetings} />
    </TestWrapper>
  )

  return {
    formatDate
  }
}

describe('OverlappingMeetingsText', () => {
  describe('when scheduled with overlapping meetings', () => {
    it('renders text and list of meetings', () => {
      const MEETING_NAME = 'Meeting 1'
      const MEETING_TIME = '2022-01-01T00:00:00+00:00'

      const { formatDate } = arrangeTest({
        meetings: [{ name: MEETING_NAME, scheduledAt: MEETING_TIME }],
        type: CallRequestType.SCHEDULED
      })

      expect(
        screen.getByText(
          'The time requested by the client overlaps with your existing meeting:'
        )
      ).toBeInTheDocument()
      expect(formatDate).toHaveBeenCalledWith(MEETING_TIME, 'h:mm a')
    })
  })

  describe('when scheduled with no overlapping meeting', () => {
    it('does not render anything', () => {
      const { formatDate } = arrangeTest({
        meetings: [],
        type: CallRequestType.SCHEDULED
      })

      expect(
        screen.queryByText(
          'The time requested by the client overlaps with your existing meeting:'
        )
      ).not.toBeInTheDocument()
      expect(formatDate).not.toHaveBeenCalled()
    })
  })

  describe('when not scheduled', () => {
    it('does not render anything', () => {
      const { formatDate } = arrangeTest({
        meetings: [{ name: 'test', scheduledAt: '2022-01-01T00:00:00+00:00' }],
        type: CallRequestType.INSTANT
      })

      expect(
        screen.queryByText(
          'The time requested by the client overlaps with your existing meeting:'
        )
      ).not.toBeInTheDocument()
      expect(formatDate).not.toHaveBeenCalled()
    })
  })
})
