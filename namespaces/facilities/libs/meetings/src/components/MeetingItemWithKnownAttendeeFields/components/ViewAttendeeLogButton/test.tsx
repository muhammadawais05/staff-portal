import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { when } from 'jest-when'

import { GetMeetingAttendeesCountDocument } from './data'
import ViewAttendeeLogButton from '.'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock

const arrangeTest = () => {
  const {
    container: { textContent }
  } = render(
    <TestWrapper>
      <ViewAttendeeLogButton onClick={() => {}} meetingUrl='url' />
    </TestWrapper>
  )

  return textContent
}

describe('ViewAttendeeLogButton', () => {
  describe('when data is loading', () => {
    it('button is not visible', () => {
      when(mockUseQuery)
        .calledWith(GetMeetingAttendeesCountDocument, {
          variables: { meetingUrl: 'url' }
        })
        .mockReturnValue({
          data: null,
          loading: true
        })

      const content = arrangeTest()

      expect(content).toBe('')
    })
  })

  describe('when no meeting endpoints', () => {
    it('button is not visible', () => {
      when(mockUseQuery)
        .calledWith(GetMeetingAttendeesCountDocument, {
          variables: { meetingUrl: 'url' }
        })
        .mockReturnValue({
          data: { meetingEndpoints: { totalCount: 0 } },
          loading: false
        })

      const content = arrangeTest()

      expect(content).toBe('')
    })
  })

  describe('when there are some meeting endpoints', () => {
    it('button is visible', () => {
      when(mockUseQuery)
        .calledWith(GetMeetingAttendeesCountDocument, {
          variables: { meetingUrl: 'url' }
        })
        .mockReturnValue({
          data: { meetingEndpoints: { totalCount: 1 } },
          loading: false
        })

      const content = arrangeTest()

      expect(content).toBe('View Attendee Log')
    })
  })
})
