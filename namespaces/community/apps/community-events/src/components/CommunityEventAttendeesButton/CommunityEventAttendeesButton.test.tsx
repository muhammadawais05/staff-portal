import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import CommunityEventAttendeesButton from './CommunityEventAttendeesButton'

jest.mock(
  '../../data/get-community-event-attendees/get-community-event-attendees.staff.gql'
)

describe('CommunityEventAttendeesButton', () => {
  it('renders attendees button if there are attendees', () => {
    render(
      <TestWrapper>
        <CommunityEventAttendeesButton
          communityEventId='123'
          totalAttendees={5}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button', { name: '5 attendees' })).toBeEnabled()
  })

  it('renders attendees button disabled if there are no attendees', () => {
    render(
      <TestWrapper>
        <CommunityEventAttendeesButton
          communityEventId='123'
          totalAttendees={0}
        />
      </TestWrapper>
    )

    expect(screen.getByRole('button', { name: '0 attendees' })).toBeDisabled()
  })
})
