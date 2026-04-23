import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { MeetingFragment } from '@staff-portal/meetings'

import MeetingItem from './MeetingItem'

jest.mock('@staff-portal/meetings', () => ({
  MeetingHeader: () => <div data-testid='meeting-header' />,
  MeetingItemWithKnownAttendeeFields: () => (
    <div data-testid='meeting-with-known-attendee' />
  ),
  MeetingItemWithUnknownAttendeeFields: () => (
    <div data-testid='meeting-with-unknown-attendee' />
  )
}))

jest.mock('../../../../components/MeetingPendingJobs', () => () => (
  <div data-testid='meeting-pending-jobs' />
))

const arrangeTest = (attendee?: {}) =>
  render(
    <TestWrapper>
      <MeetingItem
        meeting={{ subject: 'test subject', attendee } as MeetingFragment}
      />
    </TestWrapper>
  )

describe('MeetingItem', () => {
  describe('when there is no attendee', () => {
    it('renders meeting header and unknown attendee fields', () => {
      arrangeTest()

      expect(screen.getByTestId('meeting-header')).toBeInTheDocument()
      expect(
        screen.getByTestId('meeting-with-unknown-attendee')
      ).toBeInTheDocument()
    })
  })

  describe('when there is an attendee', () => {
    it('renders meeting header, known attendee fields and pending jobs', () => {
      arrangeTest({ attendee: {} })

      expect(screen.getByTestId('meeting-header')).toBeInTheDocument()
      expect(
        screen.getByTestId('meeting-with-known-attendee')
      ).toBeInTheDocument()
      expect(screen.getByTestId('meeting-pending-jobs')).toBeInTheDocument()
    })
  })
})
